import React, { FC, useEffect } from 'react';

import { getTimeCode } from '../literatureClock/api';
import { getCurrentGames } from './api';
import { Props, defaultData, Game } from './types';

import './Nba.sass';
import { getPeriod } from './getPeriod';
import { useTime, useCachedEffect } from '../../../hooks';

const Nba: FC<Props> = ({ cache, data = defaultData, setCache, loader }) => {
  const time = useTime();
  const timeCode = getTimeCode(time);

  useCachedEffect(
    () => {
      getCurrentGames(loader).then(setCache);
    },
    cache ? 60000 : 0,
    [timeCode],
  );

  if (!cache || cache.length < 1) {
    return <div>No games today</div>;
  }

  return (
    <div className="nba-container">
      {cache.map((game: Game) => (
        <div key={game.gameId} className="nba-game">
          <div className="period">{getPeriod(game)}</div>
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
