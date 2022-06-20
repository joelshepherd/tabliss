import React from "react";
import { useToggle } from "../../hooks";

type Props = {
  children: React.ReactNode;
  name: string;
};

const ToggleSection: React.FC<Props> = ({ name, children }) => {
  const [isOpen, toggleOpen] = useToggle();

  return (
    <>
      <p>
        <a onClick={toggleOpen}>
          {isOpen ? "Close" : "Open"} {name}
        </a>
      </p>

      {isOpen && children}
    </>
  );
};

export default ToggleSection;
