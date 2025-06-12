import { ChevronLeft, EllipsisVertical } from "lucide-react";
import { ReactNode, useEffect, useRef, useState, MouseEvent } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { createPortal } from "react-dom";

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
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
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
        subMenu.style.right = "5%";

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
      onClick={() => hasSubMenu && setShowSubMenu(!showSubMenu)}
    >
      <button
        className={`flex items-center justify-between gap-2 p-2 text-left cursor-pointer bg-white rounded w-full transition-all duration-300 ${
          item.color === "red"
            ? "hover:bg-red-100 hover:text-red-700"
            : item.color === "orange"
            ? "hover:bg-orange-100 hover:text-orange-700"
            : item.color === "green"
            ? "hover:bg-green-100 hover:text-green-700"
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
  onClick,
}: MenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const closeMenu = () => setIsOpen(false);

  const menuRef = useClickOutside<HTMLDivElement>(() => {
    if (isOpen) setIsOpen(false);
  });

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();

      let top = 0;
      let left = 0;

      switch (position) {
        case "bottom-right":
          top = rect.bottom;
          left = rect.right;
          break;
        case "bottom-left":
          top = rect.bottom;
          left = rect.left;
          break;
        case "top-right":
          top = rect.top;
          left = rect.right;
          break;
        case "top-left":
          top = rect.top;
          left = rect.left;
          break;
      }

      setMenuPosition({ top, left });
    }
  }, [isOpen, position]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div onClick={onClick} className={className ?? "relative inline-block"}>
      <div ref={triggerRef} onClick={toggleMenu} className="cursor-pointer">
        {trigger || <EllipsisVertical className="h-5 w-5" />}
      </div>

      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            className="fixed flex flex-col drop-shadow-lg bg-white rounded-lg p-2 gap-1 z-[9999] min-w-40"
            style={{
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
              transform: position.includes("right") ? "translateX(-100%)" : "",
            }}
          >
            {items.map((item, index) => (
              <MenuItem key={index} item={item} closeMenu={closeMenu} />
            ))}
          </div>,
          document.body
        )}
    </div>
  );
}
