import React, { FC } from "react";
import {defaultData, Props} from "./types";


const CustomText: FC<Props> = ({data= defaultData}) => {

  let sep: string;
  if (data.atNewline)
    sep = "\n";
  else
    sep = data.separator;

  const result = data.text.split(sep)[Math.floor(Math.random() * data.text.split(sep).length)];

  return (
    <div className="CustomText">
      <h3>{result}</h3>
    </div>
  );

};

export default CustomText;
