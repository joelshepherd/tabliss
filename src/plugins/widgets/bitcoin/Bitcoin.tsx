import React from "react";
import { formatDistance, fromUnixTime } from "date-fns";
import { usePushError } from "../../../api";
import { formatBytes, MINUTES } from "../../../utils";
import { getBlocks } from "./api";
import { defaultData, Props } from "./types";
import "./Bitcoin.sass";

const getFormattedDistance = (unixTime: number) => {
  return formatDistance(fromUnixTime(unixTime), new Date(), {
    addSuffix: true,
  });
};

const BitcoinWidget: React.FC<Props> = ({
  cache,
  data = defaultData,
  setCache,
  loader,
}) => {
  const pushError = usePushError();

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
            <div className="transaction-count">
              {block.tx_count} transactions
            </div>
            <div className="time-difference">
              {getFormattedDistance(block.timestamp)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BitcoinWidget;
