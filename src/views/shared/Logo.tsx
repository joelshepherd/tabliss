import React from "react";
import "./Logo.css";
import tablissLogo from "./tabliss.svg";

const Logo: React.FC = () => (
  <h1 className="Logo">
    <i dangerouslySetInnerHTML={{ __html: tablissLogo }} />
  </h1>
);

export default Logo;
