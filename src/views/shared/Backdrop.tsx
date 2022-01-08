import React, { FC, HTMLAttributes } from "react";

import { useSelector } from "../../store";

type Props = HTMLAttributes<HTMLDivElement> & {
  ready?: boolean;
};

const Backdrop: FC<Props> = ({
  children,
  ready = true,
  style = {},
  ...rest
}) => {
  // Lag one frame behind to show the animation
  const [show, setShow] = React.useState(ready);
  React.useLayoutEffect(() => {
    setTimeout(() => setShow(ready), 0);
  }, [ready]);

  const background = useSelector((state) =>
    state.data.backgrounds.find((plugin) => plugin.active),
  );

  if (!background) {
    return null;
  }

  const {
    display: { blur, luminosity },
  } = background;

  style = { ...style };

  if (blur) {
    style["filter"] = `blur(${blur}px)`;
    style["transform"] = `scale(${blur / 500 + 1})`;
  }

  if (luminosity) {
    style["opacity"] = 1 - Math.abs(luminosity);
  }

  return (
    <div
      className="fullscreen"
      style={{
        backgroundColor: luminosity > 0 ? "white" : "black",
        opacity: show ? 1 : 0,
        transition: "opacity 200ms ease-in-out",
      }}
    >
      <div style={style} {...rest}>
        {children}
      </div>
    </div>
  );
};

export default Backdrop;
