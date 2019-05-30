import { SuggestionsResult } from './interfaces';

// For mounting the result
declare global {
  interface Window {
    mountResult?: {
      [key: string]: (data: SuggestionsResult) => void;
    };
  }
}

export default (url: string, callback: (data: SuggestionsResult) => void) => {
  if (!window.mountResult) {
    window.mountResult = {};
  }

  const id =
    'i' +
    Math.random()
      .toString(36)
      .slice(2); // Create unique id to return to correct result

  window.mountResult[id] = (data: SuggestionsResult) => {
    callback(data);

    if (window.mountResult) {
      delete window.mountResult.id;
    }

    const scriptToRemove = document.getElementById('suggestionsQuery' + id);
    if (scriptToRemove !== null) {
      scriptToRemove.remove();
    }
  };

  const scriptToAdd = document.createElement('script');
  scriptToAdd.src = url.replace('{callback}', `mountResult.${id}`);
  scriptToAdd.id = 'suggestionsQuery' + id;

  document.head.appendChild(scriptToAdd);
};
