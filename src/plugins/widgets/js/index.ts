import { Plugin } from '../../types';
import Js from './Js';
import JsSettings from './JsSettings';

const config: Plugin = {
  key: 'widget/js',
  kind: 'widget',
  name: 'Custom JS',
  description: 'Program in your program.',
  Dashboard: Js,
  Settings: JsSettings,
};

export default config;
