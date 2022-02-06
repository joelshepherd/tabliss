import React, { FC, HTMLAttributes } from "react";
import { useSelector } from "../../lib/db/react";
import { BackgroundDisplay, db } from "../../state";

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

  // TODO: Consider passing this in via prop
  const background = useSelector(db, (get) => get(`data/${get("background")}`));
  if (!background) return null;

  // TODO: display types
  const { blur, luminosity = 0 } = background.display as BackgroundDisplay;

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
        color: luminosity > 0 ? "white" : "black",
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
