import feather-icons from "feather-icons/dist/icons.json";
// import arcticons from "icons.json";
import React, { FC } from "react";

type Props = {
  colour?: string;
  name: string;
  size?: number | string;
};

const Icon: FC<Props> = ({ colour = "currentColor", name, size = 24 }) => (
  <i>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={colour}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: feather-icons[name] }}
    />
  </i>
);

const Arcticon: FC<Props> = ({ colour = "currentColor", name, size = 48 }) => (
  <i>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={colour}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: arcticons[name] }}
    />
  </i>
);
export default Icon;
export default Arcticon;
