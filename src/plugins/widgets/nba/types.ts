import { API } from "../../types";

export type Data ={

}

type Team = {
  triCode: string,
  fullName: string,
  logo: string,
  score: number,
}

type GamePeriod = {
  current: number,
  isEndOfPeriod: boolean,
  isHalftime: boolean,
  maxRegular: number,
}

export type Game = {
  gameId: string,
  clock: string,
  hTeam: Team,
  vTeam: Team,
  isGameActivated: boolean,
  startTimeUTC: string,
  period: GamePeriod,
};

export type Cache = Game[];
export type Props = API<Data, Cache>;

export const defaultData: Data = {

}
