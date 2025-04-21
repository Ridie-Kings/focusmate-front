import { ChevronLeft, ChevronRight, EllipsisVertical } from "lucide-react";
import { ReactNode, useEffect, useRef, useState } from "react";

interface MenuItemProps {
  label: string;
  onClick?: () => void;
  icon?: ReactNode;
  color?: string;
  subMenu?: MenuItemProps[];
}

interface MenuProps {
  items: MenuItemProps[];
  trigger?: ReactNode;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  className?: string;
}

const findOverflowParent = (
  element: HTMLElement | null
): HTMLElement | null => {
  if (!element || element === document.body) return null;

  const style = window.getComputedStyle(element);
  if (
    style.overflow === "auto" ||
    style.overflow === "scroll" ||
    style.overflowX === "auto" ||
    style.overflowX === "scroll" ||
    style.overflowY === "auto" ||
    style.overflowY === "scroll"
  ) {
    return element;
  }

  return findOverflowParent(element.parentElement);
};

const MenuItem = ({
  item,
  closeMenu,
  depth = 0,
}: {
  item: MenuItemProps;
  closeMenu: () => void;
  depth?: number;
}) => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  const hasSubMenu = item.subMenu && item.subMenu.length > 0;

  useEffect(() => {
    if (showSubMenu && itemRef.current) {
      const subMenu = itemRef.current.querySelector(".submenu") as HTMLElement;
      if (subMenu) {
        const itemRect = itemRef.current.getBoundingClientRect();

        const overflowParent = findOverflowParent(itemRef.current);
        let parentRect: DOMRect;

        if (overflowParent) {
          parentRect = overflowParent.getBoundingClientRect();
        } else {
          parentRect = new DOMRect(0, 0, window.innerWidth, window.innerHeight);
        }

        subMenu.style.left = "auto";
        subMenu.style.right = "0%";

        const leftSpace = itemRect.left - parentRect.left;
        const rightSpace = parentRect.right - itemRect.right;

        if (leftSpace < 200 && rightSpace > 200) {
          subMenu.style.left = "100%";
          subMenu.style.right = "auto";
        }

        setTimeout(() => {
          const subMenuRect = subMenu.getBoundingClientRect();

          if (subMenuRect.bottom > parentRect.bottom) {
            const newTopPosition = Math.max(
              -(subMenuRect.height - itemRect.height),
              -(itemRect.top - parentRect.top)
            );
            subMenu.style.top = `${newTopPosition}px`;
          }
        }, 0);
      }
    }
  }, [showSubMenu]);

  return (
    <div
      ref={itemRef}
      className="relative"
      onMouseEnter={() => hasSubMenu && setShowSubMenu(true)}
      onMouseLeave={() => hasSubMenu && setShowSubMenu(false)}
    >
      <button
        className={`flex items-center justify-between gap-2 p-2 text-left cursor-pointer bg-white rounded w-full transition-all duration-300 ${
          item.color === "red"
            ? "hover:bg-red-100 hover:text-red-700"
            : "hover:bg-gray-100"
        }`}
        onClick={() => {
          if (!hasSubMenu) {
            item.onClick?.();
            closeMenu();
          } else if (depth > 0) {
            setShowSubMenu(!showSubMenu);
          }
        }}
      >
        <div className="flex items-center gap-2">
          {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
          <span>{item.label}</span>
        </div>
        {hasSubMenu && <ChevronLeft className="h-4 w-4 rotate-270" />}
      </button>

      {hasSubMenu && showSubMenu && (
        <div className="submenu absolute bg-white rounded-lg shadow-lg p-2 min-w-40 z-50">
          {item.subMenu!.map((subItem, subIndex) => (
            <MenuItem
              key={subIndex}
              item={subItem}
              closeMenu={closeMenu}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function Menu({
  items,
  trigger,
  position = "bottom-right",
  className,
}: MenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        triggerRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen && menuRef.current && triggerRef.current) {
      const overflowParent = findOverflowParent(triggerRef.current);

      let parentRect: DOMRect;
      if (overflowParent) {
        parentRect = overflowParent.getBoundingClientRect();
      } else {
        parentRect = new DOMRect(0, 0, window.innerWidth, window.innerHeight);
      }

      menuRef.current.style.left = "";
      menuRef.current.style.right = "";
      menuRef.current.style.top = "";
      menuRef.current.style.bottom = "";

      const basePosition = position || "bottom-right";
      menuRef.current.className = `absolute flex flex-col drop-shadow-lg bg-white rounded-lg p-2 gap-1 z-50 min-w-40 mt-1 ${
        basePosition === "bottom-right"
          ? "top-full right-0"
          : basePosition === "bottom-left"
          ? "top-full left-0"
          : basePosition === "top-right"
          ? "bottom-full right-0"
          : "bottom-full left-0"
      }`;

      setTimeout(() => {
        if (!menuRef.current) return;

        const updatedMenuRect = menuRef.current.getBoundingClientRect();

        if (updatedMenuRect.right > parentRect.right) {
          menuRef.current.style.left = "auto";
          menuRef.current.style.right = "0";
        }

        if (updatedMenuRect.left < parentRect.left) {
          menuRef.current.style.left = "0";
          menuRef.current.style.right = "auto";
        }

        if (updatedMenuRect.bottom > parentRect.bottom) {
          menuRef.current.style.top = "auto";
          menuRef.current.style.bottom = "100%";
        }

        if (updatedMenuRect.top < parentRect.top) {
          menuRef.current.style.top = "100%";
          menuRef.current.style.bottom = "auto";
        }
      }, 0);
    }
  }, [isOpen, position]);

  const getBasePositionClasses = () => {
    switch (position) {
      case "bottom-right":
        return "top-full right-0";
      case "bottom-left":
        return "top-full left-0";
      case "top-right":
        return "bottom-full right-0";
      case "top-left":
        return "bottom-full left-0";
      default:
        return "top-full right-0";
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={className ?? "relative inline-block"}>
      <div ref={triggerRef} onClick={toggleMenu} className="cursor-pointer">
        {trigger || <EllipsisVertical className="h-5 w-5" />}
      </div>

      {isOpen && (
        <div
          ref={menuRef}
          className={`absolute mt-1 flex flex-col drop-shadow-lg bg-white rounded-lg p-2 gap-1 z-50 min-w-40 ${getBasePositionClasses()}`}
        >
          {items.map((item, index) => (
            <MenuItem key={index} item={item} closeMenu={closeMenu} />
          ))}
        </div>
      )}
    </div>
  );
}
