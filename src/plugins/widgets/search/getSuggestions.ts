// For mounting the result
declare global {
  interface Window {
    mountResult?: {
      [id: string]: (data: SuggestionsResult) => void;
    };
  }
}

type SuggestionsResult = {
  [0]: string;
  [1]: string[];
};

export function getSuggestions(query: string, engineUrl: string) {
  return new Promise<string[]>((resolve, reject) => {
    if (!window.mountResult) {
      window.mountResult = {};
    }

    const id = "i" + Math.random().toString(36).slice(2); // Create unique id to return to correct result

    window.mountResult[id] = (data: SuggestionsResult) => {
      // Resolve the suggestions
      resolve(data[1]);

      if (window.mountResult) {
        delete window.mountResult.id;
      }

      const scriptToRemove = document.getElementById("suggestionsQuery" + id);
      if (scriptToRemove !== null) {
        scriptToRemove.remove();
      }
    };

    const scriptToAdd = document.createElement("script");

    scriptToAdd.id = "suggestionsQuery" + id;
    scriptToAdd.onerror = reject;
    scriptToAdd.src = engineUrl
      .replace("{searchTerms}", query)
      .replace("{callback}", `mountResult.${id}`);

    document.head.appendChild(scriptToAdd);
  });
}
