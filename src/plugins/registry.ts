import { Plugin, Type } from './interfaces';

const registry: Plugin[] = [];

/**
 * Register a plugin
 *
 * @param {Plugin} plugin
 * @return {void}
 */
export function registerPlugin(plugin: Plugin): void {
  registry.push(plugin);
}

/**
 * Get a plugin config
 *
 * @param {string} key
 * @return {Plugin}
 */
export function getPlugin(key: string): Plugin {
  const plugin = registry.find(p => p.key === key);

  if (!plugin) {
    throw new Error(`Could not find plugin '${key}'.`);
  }

  return plugin;
}

/**
 * Get plugins by type
 *
 * @param {Type} type
 * @return {Plugin[]}
 */
export function getPluginsByType(type: Type): Plugin[] {
  return registry.filter(plugin => plugin.type === type);
}
