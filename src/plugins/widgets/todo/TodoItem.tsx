import React, { FC, useLayoutEffect, useRef, useState } from "react";

import { useKeyPress } from "../../../hooks";
import { Icon, RemoveIcon } from "../../../views/shared";
import { State } from "./reducer";
import "./TodoItem.sass";

interface Props {
  item: State[number];
  onToggle(): void;
  onUpdate(contents: string, subtitle?: string): void;
  onDelete(): void;
}

const TodoItem: FC<Props> = ({ item, onDelete, onUpdate, onToggle }) => {
  const contentRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const getSubtitle = () => {
    if (item.completed && item.completedAt) {
      const now = Date.now();
      const diff = now - item.completedAt;
      const minutes = Math.floor(diff / (1000 * 60));
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const days = Math.floor(hours / 24);
      
      if (minutes < 1) {
        return "1 min ago";
      } else if (minutes < 60) {
        return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
      } else if (hours < 24) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
      } else {
        return `${days} day${days > 1 ? 's' : ''} ago`;
      }
    }
    return item.subtitle || "";
  };

  useLayoutEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerText = item.contents;

      if (item.contents === "") {
        contentRef.current.focus();
      }
    }
    
    if (subtitleRef.current) {
      const subtitle = getSubtitle();
      subtitleRef.current.innerText = subtitle;
    }
  }, [item.contents, item.subtitle, item.completed, item.completedAt]);

  useKeyPress(
    (event) => {
      if (event.target === contentRef.current || event.target === subtitleRef.current) {
        event.preventDefault();

        if (event.target === contentRef.current && contentRef.current) {
          contentRef.current.blur();
        }
        if (event.target === subtitleRef.current && subtitleRef.current) {
          subtitleRef.current.blur();
        }
      }
    },
    ["Enter"],
    false,
  );

  useKeyPress(
    (event) => {
      if (event.target === contentRef.current) {
        event.preventDefault();

        if (contentRef.current) {
          // Reset contents on escape
          contentRef.current.innerText = item.contents;
          contentRef.current.blur();
        }
      }
      if (event.target === subtitleRef.current) {
        event.preventDefault();

        if (subtitleRef.current) {
          // Reset subtitle on escape
          subtitleRef.current.innerText = item.subtitle || "";
          subtitleRef.current.blur();
        }
      }
    },
    ["Escape"],
    false,
  );

  return (
    <div 
      className={`TodoItem ${item.completed ? 'completed' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="checkbox" onMouseDown={onToggle}>
        <Icon name={item.completed ? "check-circle" : "circle"} />
      </div>
      
      <div className="content">
        <span
          ref={contentRef}
          className="title"
          contentEditable={!item.completed}
          onBlur={(event) => onUpdate(event.currentTarget.innerText, item.subtitle)}
        />
        <span
          ref={subtitleRef}
          className="subtitle"
          onBlur={(event) => onUpdate(item.contents, event.currentTarget.innerText)}
        />
      </div>

      {!item.completed && (
        <a onMouseDown={onDelete} className="delete">
          <RemoveIcon />
        </a>
      )}
    </div>
  );
};

export default TodoItem;

