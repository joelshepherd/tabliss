import Js from './Js';
import JsSettings from './JsSettings';

export default {
  type: 'widget/js',
  kind: 'widget',
  title: 'Custom JS',
  Dashboard: Js,
  Settings: JsSettings,
} as const;
