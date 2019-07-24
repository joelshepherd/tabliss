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

  if (!cache) {
     return null;
  }

  return (
    <div>{
      cache.map((game: Game) => (
        <div key={game.gameId} className='nba-game'>
          <p>
            <img className="icon"src={game.hTeam.logo}/>
            {game.hTeam.triCode} - {game.vTeam.triCode}
            <img className="icon"src={game.vTeam.logo}/>
          </p>
          {game.period.current ? <p>{game.hTeam.score} - {game.vTeam.score}</p>: <p>{format(new Date(game.startTimeUTC), 'hh:mm a')}</p>}
        </div>
      ))}
    </div>
  )
}

export default Nba;
