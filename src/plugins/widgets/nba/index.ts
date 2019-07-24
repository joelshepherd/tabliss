import { Plugin } from '../../types';
import Nba from './Nba';
import NbaSettings from './NbaSettings';

const config: Plugin = {
  key: 'widget/nba',
  kind: 'widget',
  name: 'NBA Scores',
  description: 'Keep up to date with todays NBA games.',
  Dashboard: Nba,
  Settings: NbaSettings,
}

export default config;
