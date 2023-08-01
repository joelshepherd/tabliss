import React from "react";
import "./Logo.css";
import logo from "./logo.svg";

const Logo: React.FC = () => (
  <h1 className="Logo">
    <i dangerouslySetInnerHTML={{ __html: logo }} />
  </h1>
);

export default Logo;
