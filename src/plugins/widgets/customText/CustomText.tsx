import React, { FC } from "react";
import {defaultData, Props} from "./types";


const CustomText: FC<Props> = ({data= defaultData}) => {

  // Code for unbiased rand from https://pthree.org/2018/06/13/why-the-multiply-and-floor-rng-method-is-biased
  const unbiasedRand = (range: number) => {
    let max = Math.floor(2**32/range) * range;
    let x;
    do {
      x = Math.floor(Math.random() * 2**32);
    } while (x >= max);

    return(x % range);
  }

  let sep: string;
  if (data.atNewline)
    sep = "\n";
  else
    sep = data.separator;

  const result = data.text.split(sep)[unbiasedRand(data.text.split(sep).length)];

  return (
    <div className="CustomText">
      <h3>{result}</h3>
    </div>
  );

};

export default CustomText;
