import React, { FC, useEffect, useRef, useState } from "react";

import { useKeyPress } from "../../../hooks";
import { Icon } from "../../../views/shared";
import "./ContextMenu.sass";

export interface MenuItem {
  id: string;
  name: string;
  icon: string;
  disabled?: boolean;
}

interface ContextMenuProps {
  x: number;
  y: number;
  items: MenuItem[];
  onSelect: (item: MenuItem) => void;
  onClose: () => void;
}

const ContextMenu: FC<ContextMenuProps> = ({
  x,
  y,
  items,
  onSelect,
  onClose,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [position, setPosition] = useState({ x, y });
  const menuRef = useRef<HTMLDivElement>(null);

  // Edge detection and repositioning
  useEffect(() => {
    if (menuRef.current) {
      const menu = menuRef.current;
      const rect = menu.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let adjustedX = x;
      let adjustedY = y;

      // Check if menu goes off right edge
      if (x + rect.width > viewportWidth) {
        adjustedX = viewportWidth - rect.width - 8; // 8px padding
      }

      // Check if menu goes off bottom edge
      if (y + rect.height > viewportHeight) {
        adjustedY = viewportHeight - rect.height - 8; // 8px padding
      }

      // Check if menu goes off left edge
      if (adjustedX < 8) {
        adjustedX = 8;
      }

      // Check if menu goes off top edge
      if (adjustedY < 8) {
        adjustedY = 8;
      }

      if (adjustedX !== x || adjustedY !== y) {
        setPosition({ x: adjustedX, y: adjustedY });
      }
    }
  }, [x, y]);

  // Click outside detection
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Keyboard navigation - ArrowDown
  useKeyPress(
    () => {
      setActiveIndex((prev) => {
        let next = prev + 1;
        // Skip disabled items
        while (next < items.length && items[next].disabled) {
          next++;
        }
        return next < items.length ? next : prev;
      });
    },
    ["ArrowDown"],
    false,
  );

  // Keyboard navigation - ArrowUp
  useKeyPress(
    () => {
      setActiveIndex((prev) => {
        let next = prev - 1;
        // Skip disabled items
        while (next >= 0 && items[next].disabled) {
          next--;
        }
        return next >= 0 ? next : prev;
      });
    },
    ["ArrowUp"],
    false,
  );

  // Keyboard navigation - Enter
  useKeyPress(
    () => {
      const item = items[activeIndex];
      if (item && !item.disabled) {
        onSelect(item);
      }
    },
    ["Enter"],
    false,
  );

  // Keyboard navigation - Escape
  useKeyPress(
    () => {
      onClose();
    },
    ["Escape"],
    false,
  );

  const handleItemClick = (item: MenuItem) => {
    if (!item.disabled) {
      onSelect(item);
    }
  };

  const handleItemHover = (index: number) => {
    if (!items[index].disabled) {
      setActiveIndex(index);
    }
  };

  return (
    <div
      ref={menuRef}
      className="ContextMenu"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`ContextMenu-item ${index === activeIndex ? "active" : ""} ${item.disabled ? "disabled" : ""}`}
          onClick={() => handleItemClick(item)}
          onMouseEnter={() => handleItemHover(index)}
        >
          <Icon name={item.icon} />
          <span className="ContextMenu-item-name">{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default ContextMenu;
