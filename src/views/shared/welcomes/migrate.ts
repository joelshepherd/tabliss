import { v4 as generateId } from 'uuid';

import { DataState } from '../../../store/reducers/types';
import { defaultData as defaultGiphyData } from '../../../plugins/backgrounds/giphy/types';
import { defaultData as defaultGradientData } from '../../../plugins/backgrounds/gradient/types';
import { defaultData as defaultUnsplashData } from '../../../plugins/backgrounds/unsplash/types';
import { defaultData as defaultSearchData } from '../../../plugins/widgets/search/types';
import { defaultData as defaultTimeData } from '../../../plugins/widgets/time/types';
import { defaultData as defaultTodoData } from '../../../plugins/widgets/todo/types';

// Root state
export interface Version1Config {
  dashboard: {
    background: keyof typeof keyMap;
    widgets: (keyof typeof keyMap)[];
  };
  storage: {
    [key: string]: {
      local: { [key: string]: any };
      settings: { [key: string]: any };
    };
  };
  settings: {
    locale?: string;
    timezone?: string;
  };
}

/**
 * Migrate Tabliss v1 config to v2
 */
export function migrateVersion1(config: Version1Config): DataState {
  // Data
  const data: DataState['data'] = {};

  // Backgrounds
  const backgrounds: DataState['backgrounds'] = [
    {
      id: generateId(),
      key: translateKey(config.dashboard.background) || 'background/unsplash',
      active: true,
      display: { blur: 0, luminosity: 0 },
    },
  ];
  data[backgrounds[0].id] = translateData(
    config.dashboard.background,
    config.storage[config.dashboard.background],
  ) as object;

  // Widgets
  const fontSettings = config.storage['core/widgets/font'];
  const fontDisplay = fontSettings
    ? {
        colour: fontSettings.settings.colour || '#ffffff',
        fontFamily: fontSettings.settings.family,
        fontSize: fontSettings.settings.size || 28,
      }
    : {};

  const widgets: DataState['widgets'] = config.dashboard.widgets
    .filter(translateKey)
    .map(previousType => {
      const id = generateId();
      const key = translateKey(previousType) as string; // false is removed in filter
      data[id] = translateData(
        previousType,
        config.storage[previousType],
      ) as object;

      return {
        id,
        key,
        active: true,
        display: {
          ...fontDisplay,
          position: 'middleCentre',
        },
      };
    });

  return {
    backgrounds,
    data,
    widgets,
    locale: config.settings.locale,
    timeZone: config.settings.timezone,
  };
}

// Translate plugin type keys
const keyMap = {
  'core/backgrounds/colour': 'background/colour',
  'extra/backgrounds/dribbble': null,
  'extra/backgrounds/giphy': 'background/giphy',
  'core/backgrounds/gradient': 'background/gradient',
  'core/backgrounds/image': 'background/image',
  'extra/backgrounds/unsplash': 'background/unsplash',
  'core/widgets/css': 'widget/css',
  'core/widgets/font': null,
  'core/widgets/greeting': 'widget/greeting',
  'widgets/js': 'widget/js',
  'core/widgets/links': 'widget/links',
  'widgets/literature-clock': 'widget/literature-clock',
  'core/widgets/message': 'widget/message',
  'extra/widgets/quote': 'widget/quote',
  'core/widgets/reload': null,
  'extra/widgets/search': 'widget/search',
  'core/widgets/time': 'widget/time',
  'widgets/todo': 'widget/todo',
  'extra/widgets/weather': 'widget/weather',
};

function translateKey(key: keyof typeof keyMap) {
  return keyMap[key];
}

// Translate storage to data
type Storage = {
  local: { [key: string]: any };
  settings: { [key: string]: any };
};

function translateData(type: string, storage?: Storage) {
  switch (type) {
    case 'extra/backgrounds/giphy':
      return storage ? { ...defaultGiphyData, ...storage.settings } : undefined;

    case 'core/backgrounds/gradient':
      return storage
        ? { ...defaultGradientData, ...storage.settings }
        : undefined;

    case 'core/backgrounds/image':
      // @todo Can I move this to cache?
      return undefined;

    case 'extra/backgrounds/unsplash':
      return storage
        ? { ...defaultUnsplashData, ...storage.settings }
        : undefined;

    case 'core/widgets/links':
      return storage ? { columns: 1, ...storage.settings } : undefined;

    case 'core/widgets/message':
      return storage && storage.settings
        ? { messages: [storage.settings.message] }
        : undefined;

    case 'extra/widgets/search':
      return storage
        ? { ...defaultSearchData, ...storage.settings }
        : undefined;

    case 'core/widgets/time':
      return storage ? { ...defaultTimeData, ...storage.settings } : undefined;

    case 'widgets/todo':
      return storage
        ? {
            ...defaultTodoData,
            ...storage.settings,
            ...storage.local, // Move into data
          }
        : undefined;

    case 'extra/widgets/weather':
      return storage
        ? {
            showDetails: storage.local.details || false, // Move into data
            latitude: storage.settings.latitude,
            longitude: storage.settings.longitude,
            units: storage.settings.units || 'auto',
          }
        : undefined;

    default:
      return storage ? storage.settings : undefined;
  }
}
