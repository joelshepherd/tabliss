import React from "react";
import { formatDistanceToNowStrict, fromUnixTime } from "date-fns";
import { db } from "../../../db/state";
import { useValue } from "../../../lib/db/react";
import { usePushError } from "../../../api";
import { formatBytes, MINUTES } from "../../../utils";
import { getBlocks } from "./api";
import { defaultData, Props } from "./types";
import "./Bitcoin.sass";

const formatDistance = (unixTime: number, locale: string) => {
  const rtf = new Intl.RelativeTimeFormat(locale, {
    localeMatcher: "best fit",
    style: "long",
    numeric: "always",
  });

  const diff = formatDistanceToNowStrict(fromUnixTime(unixTime));
  const [amount, unit] = diff.split(" ");

  return rtf.format(-amount, unit as Intl.RelativeTimeFormatUnit);
};

const BitcoinWidget: React.FC<Props> = ({
  cache,
  data = defaultData,
  setCache,
  loader,
}) => {
  const pushError = usePushError();
  const locale = useValue(db, "locale");

  React.useEffect(() => {
    getBlocks(loader).then(setCache).catch(pushError);

    const timer = setInterval(
      () => getBlocks(loader).then(setCache).catch(pushError),
      1 * MINUTES,
    );

    return () => clearInterval(timer);
  }, []);

  if (!cache) {
    return null;
  }

  const blocks = cache.slice(0, data.numberOfBlocks);
  const blockColor = data.color;

  return (
    <div className="Bitcoin">
      {blocks.map((block) => (
        <div
          key={block.id}
          className={`bitcoin-block bitcoin-block--${blockColor}`}
          onClick={() =>
            location.assign(`https://mempool.space/block/${block.id}`)
          }
        >
          <div className="block-body">
            <div className="block-height">{block.height}</div>
            <div className="block-size">{formatBytes(block.size)}</div>
            <div className="transaction-count">{block.tx_count} txs</div>
            <div className="time-difference">
              {formatDistance(block.timestamp, locale)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BitcoinWidget;
