import React from "react";
import { db } from "../../../db/state";
import { useCachedEffect } from "../../../hooks";
import { useValue } from "../../../lib/db/react";
import { MINUTES } from "../../../utils";
import { getCurrentGames } from "./api";
import { getPeriod } from "./getPeriod";
import "./Nba.sass";
import { defaultData, Props } from "./types";

const EXPIRE_IN = 1 * MINUTES;

const Nba: React.FC<Props> = ({
  cache,
  data = defaultData,
  setCache,
  loader,
}) => {
  const timeZone = useValue(db, "timeZone");

  useCachedEffect(
    () => {
      getCurrentGames(loader).then(setCache);
    },
    cache ? cache.timestamp + EXPIRE_IN : 0,
    [],
  );

  if (!cache || cache.games.length < 1) {
    return <div>No games today</div>;
  }

  return (
    <div className="nba-container">
      {cache.games.map((game) => (
        <div key={game.gameId} className="nba-game">
          <div className="period">{getPeriod(game, timeZone)}</div>
          <div>
            {data.displayLogo ? (
              <img className="icon" src={game.hTeam.logo} />
            ) : null}
          </div>
          <span className="teams">
            {game.hTeam.triCode} - {game.vTeam.triCode}
          </span>
          <div>
            {data.displayLogo ? (
              <img className="icon" src={game.vTeam.logo} />
            ) : null}
          </div>
          <div className="score">
            {game.period.current ? (
              <span>
                {game.hTeam.score} {game.vTeam.score}
              </span>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Nba;
