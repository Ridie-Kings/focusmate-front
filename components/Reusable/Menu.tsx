import { ChevronRight, EllipsisVertical } from "lucide-react";
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
}

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
        const rect = itemRef.current.getBoundingClientRect();
        const rightSpace = window.innerWidth - rect.right;

        if (rightSpace < 200 && rect.left > 200) {
          subMenu.style.left = "100%";
          subMenu.style.right = "auto";
        } else {
          subMenu.style.left = "auto";
          subMenu.style.right = "100%";
        }
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
        {hasSubMenu && <ChevronRight className="h-4 w-4" />}
      </button>

      {hasSubMenu && showSubMenu && (
        <div className="submenu absolute left-full top-0 mt-0 bg-white rounded-lg shadow-lg p-2 min-w-40 z-50">
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

  const positionClasses = {
    "bottom-right": "top-full right-0",
    "bottom-left": "top-full left-0",
    "top-right": "bottom-full right-0",
    "top-left": "bottom-full left-0",
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block">
      <div ref={triggerRef} onClick={toggleMenu} className="cursor-pointer">
        {trigger || <EllipsisVertical className="h-5 w-5" />}
      </div>

      {isOpen && (
        <div
          ref={menuRef}
          className={`absolute mt-1 flex flex-col drop-shadow-lg bg-white rounded-lg p-2 gap-1 z-50 min-w-40 ${positionClasses[position]}`}
        >
          {items.map((item, index) => (
            <MenuItem key={index} item={item} closeMenu={closeMenu} />
          ))}
        </div>
      )}
    </div>
  );
}
