import React from "react";
import { db } from "../../db/state";
import { useValue } from "../../lib/db/react";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  ready?: boolean;
};

const Backdrop: React.FC<Props> = ({
  children,
  ready = true,
  style = {},
  ...rest
}) => {
  // Lag one frame behind to show the animation
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    setShow(ready);
  }, [ready]);

  // TODO: Consider passing display in via prop
  const background = useValue(db, "background");
  const { blur, luminosity = 0 } = background.display;

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
        transition: "opacity 150ms ease-in-out",
      }}
    >
      <div style={style} {...rest}>
        {children}
      </div>
    </div>
  );
};

export default Backdrop;
