import { format } from 'date-fns';
import React, { FC, useEffect } from 'react';

import { useTime } from '../../../utils/useTime';
import { getTimeCode } from '../literatureClock/api';
import { getCurrentGames } from './api';
import { Props, defaultData, Game } from './types';

import './Nba.sass';

const Nba: FC<Props> = ({
  cache,
data = defaultData,
setCache
}) => {
  const time = useTime();
  const timeCode = getTimeCode(time);

  useEffect(() => {
    getCurrentGames(new Date()).then(setCache);
  }, [timeCode]);

  if (!cache || cache.length < 1) {
     return <div>No games today</div>;
  }

  return (
    <div>{
      cache.map((game: Game) => (
        <div key={game.gameId} className='nba-game'>
          <div>{data.displayLogo ? <img className="icon"src={game.hTeam.logo}/> : null}</div>
          <span className="teams">
            {game.hTeam.triCode} - {game.vTeam.triCode}
          </span>
          <div>{data.displayLogo ? <img className="icon"src={game.vTeam.logo}/> : null}</div>
          <div className="score">
            {game.period.current ? <span>{game.hTeam.score} {game.vTeam.score}</span>: <span>{format(new Date(game.startTimeUTC), 'hh:mm a')}</span>}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Nba;
