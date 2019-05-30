# Tabliss 2

Here I am collecting ideas and goals for the next major version of Tabliss.

## Aims

- Flexible widgets layouts
- Easy to contribute Tabliss plugins

## Feature Goals

- Switchable settings profiles
- Synced setting profiles between multiple browsers
- Larger plugin settings tab
- Standardised and documented API for plugins to use
- Flexible placement of widgets
- Multiple widget styles

## Technical Goals

- Bring translations to plugins
- Make complex state management in plugins easy
- Update React to use some of the newer features
- Rewrite most components to function components
- Implement Prettier + eslint-typescript to manage code style
- Change storage driver to support extension specific storage

### Plugin API

Here is the interface the props that will be provided to the plugin entry components
(like the dashboard or settings components).

Items that may still be required:
- A way to specify which "style" the user has selected for this widget

```ts
interface PluginProps<Data = {}, Cache = {}> {
  // State the is only kept in this browser.
  // Used for large items and caches (like storage a cached image to display on next load)
  cache: Store<Cache>;

  // State that is synced between the users browsers.
  // Used for settings and text items (like the user's todos for example)
  data: Store<Data>;

  // Helpers to manipulate the loading status indicator
  loader: {
    add(): Loader;
    remove(loader: Loader): void;
  }
}

interface Store<State = {}> {
  state: State;
  setState: (state: State): void;
}
```
