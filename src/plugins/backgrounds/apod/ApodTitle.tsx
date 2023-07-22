import React from "react";
import { Image } from "./types";

type Props = Pick<Image, "title" | "copyright">;

const Credit: React.FC<Props> = ({ title, copyright }) => (
  <div className="title">
    <p>{title}</p>
    {copyright && <p>&copy; {copyright}</p>}
  </div>
);

export default Credit;
