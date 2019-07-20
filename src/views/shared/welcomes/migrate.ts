import { v4 as generateId } from 'uuid';

import { RootState } from '../../../store/reducers/types';
import { ProfileState } from '../../../store/reducers/profile';
import { defaultData as defaultUnsplashData } from '../../../plugins/backgrounds/unsplash/types';
import { defaultData as defaultTimeData } from '../../../plugins/widgets/time/types';

// Root state
export interface Version1Config {
  dashboard: {
    background: keyof typeof typeMap;
    widgets: (keyof typeof typeMap)[];
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
export function migrateVersion1(
  config: Version1Config,
): Pick<RootState, 'profile' | 'settings'> {
  // Data
  const data: ProfileState['data'] = {};

  // Backgrounds
  const backgrounds: ProfileState['backgrounds'] = [
    {
      id: generateId(),
      type: translateType(config.dashboard.background) || 'background/unsplash',
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
        colour: fontSettings.settings.colour,
        fontFamily: fontSettings.settings.family,
        fontSize: fontSettings.settings.size,
      }
    : {};

  const widgets: ProfileState['widgets'] = config.dashboard.widgets
    .filter(translateType)
    .map(previousType => {
      const id = generateId();
      const type = translateType(previousType) as string; // false is removed in filter
      data[id] = translateData(
        previousType,
        config.storage[previousType],
      ) as object;

      return {
        id,
        type,
        active: true,
        display: {
          ...fontDisplay,
          position: 'middleCentre',
        },
      };
    });

  return {
    profile: {
      backgrounds,
      data,
      widgets,
    },
    settings: {
      locale: config.settings.locale,
      timeZone: config.settings.timezone,
    },
  };
}

// Translate plugin type keys
const typeMap = {
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

function translateType(type: keyof typeof typeMap) {
  return typeMap[type];
}

// Translate storage to data
type Storage = {
  local: { [key: string]: any };
  settings: { [key: string]: any };
};

function translateData(type: string, storage?: Storage) {
  switch (type) {
    case 'core/backgrounds/image':
      // @todo Can I move this to cache?
      return undefined;

    case 'extra/backgrounds/unsplash':
      return storage
        ? { ...defaultUnsplashData, ...storage.settings }
        : undefined;

    case 'core/widgets/message':
      return storage && storage.settings
        ? { messages: [storage.settings.message] }
        : undefined;

    case 'core/widgets/time':
      return storage ? { ...defaultTimeData, ...storage.settings } : undefined;

    case 'widgets/todo':
      return storage
        ? {
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
