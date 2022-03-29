import React from "react";
import { useKeyPress } from "../../../hooks";
import { Icon } from "../../../views/shared";

interface Props
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "onChange"> {
  onChange: (value: string) => void;
  value: string;
}

const Input: React.FC<Props> = ({ onChange, value, ...props }) => {
  const span = React.useRef<HTMLSpanElement>(null);
  const [isEditing, setIsEditing] = React.useState(false);

  React.useLayoutEffect(() => {
    if (span.current) span.current.innerText = value;
  }, [value]);

  useKeyPress(
    (event) => {
      if (event.target === span.current) {
        event.preventDefault();
        if (span.current) span.current.blur();
      }
    },
    ["Escape"],
    false,
  );

  const handleBlur = () => {
    if (span.current!.innerText.trim() === "") span.current!.innerText = "";
    if (span.current!.innerText !== value) onChange(span.current!.innerText);
    setIsEditing(false);
  };
  const handleFocus = () => {
    setIsEditing(true);
  };

  return (
    <div style={{ position: "relative" }}>
      <span
        {...props}
        style={{
          ...props.style,
          display: "block",
          position: !isEditing && value === "" ? "absolute" : "unset",
        }}
        ref={span}
        contentEditable={true}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      {isEditing ? (
        <div style={{ position: "absolute", top: "-1.25em", right: "0" }}>
          <a>
            <Icon name="check" />
          </a>
        </div>
      ) : value === "" ? (
        <a onClick={() => span.current?.focus()}>
          <Icon name="edit" />
        </a>
      ) : null}
    </div>
  );
};

export default Input;
