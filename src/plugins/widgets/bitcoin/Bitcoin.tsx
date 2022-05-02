import React from "react";
import { formatDistance, fromUnixTime } from "date-fns";
import { usePushError } from "../../../api";
import { formatBytes, MINUTES } from "../../../utils";
import { getBlocks } from "./api";
import { Props } from "./types";
import "./Bitcoin.sass";

const BitcoinWidget: React.FC<Props> = ({ cache, setCache, loader }) => {
  const pushError = usePushError();
  React.useEffect(() => {
    getBlocks(loader).then(setCache).catch(pushError);

    const timer = setInterval(
      () => getBlocks(loader).then(setCache).catch(pushError),
      2 * MINUTES,
    );

    return () => clearInterval(timer);
  }, []);

  if (!cache) {
    return null;
  }

  return (
    <div className="Bitcoin">
      {cache.map((block) => (
        <div
          key={block.id}
          className="bitcoin-block"
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
              {formatDistance(fromUnixTime(block.timestamp), new Date(), {
                addSuffix: true,
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BitcoinWidget;
