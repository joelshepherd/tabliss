import React, { FC } from "react";
import {defaultData, Props} from "./types";


const CustomText: FC<Props> = ({data= defaultData}) => {
  console.log("Function ran")

  return (
    <div className="CustomText">
      <h3>{data.text.split(data.separator)[Math.floor(Math.random() * data.text.split(data.separator).length)]}</h3>
    </div>
  );

};

export default CustomText;
