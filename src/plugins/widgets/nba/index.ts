import { Config } from '../../types';
import Nba from './Nba';
import NbaSettings from './NbaSettings';

const config: Config = {
  key: 'widget/nba',
  name: 'NBA Scores',
  description: 'Keep up to date with todays NBA games.',
  dashboardComponent: Nba,
  settingsComponent: NbaSettings,
};

export default config;
