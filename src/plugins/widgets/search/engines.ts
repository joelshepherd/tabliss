interface Engine {
  key: string;
  name: string;
  search_url: string;
  suggest_url?: string;
}

export const engines: Engine[] = [
  {
    key: "google",
    name: "Google",
    search_url: "https://www.google.com/search?q={searchTerms}",
    suggest_url:
      "https://www.google.com/complete/search?client=chrome&q={searchTerms}&callback={callback}",
  },
  {
    key: "googleuk",
    name: "Google (UK)",
    search_url: "https://www.google.co.uk/search?q={searchTerms}",
    suggest_url:
      "https://www.google.co.uk/complete/search?client=chrome&q={searchTerms}&callback={callback}",
  },
  {
    key: "bing",
    name: "Bing",
    search_url: "https://www.bing.com/search?q={searchTerms}",
    suggest_url:
      "https://api.bing.com/osjson.aspx?query={searchTerms}&JsonType=callback&JsonCallback={callback}",
  },
  {
    key: "baidu",
    name: "Baidu 百度",
    search_url: "https://www.baidu.com/s?wd={searchTerms}",
  },
  {
    key: "duckduckgo",
    name: "DuckDuckGo",
    search_url: "https://duckduckgo.com/?q={searchTerms}",
  },
  {
    key: "qwant",
    name: "Qwant",
    search_url: "https://www.qwant.com/?q={searchTerms}",
  },
  {
    key: "ecosia",
    name: "Ecosia",
    search_url: "https://www.ecosia.org/search?q={searchTerms}",
  },
  {
    key: "lilo",
    name: "Lilo",
    search_url: "https://search.lilo.org/results.php?q={searchTerms}",
  },
  {
    key: "startpage",
    name: "Startpage",
    search_url: "https://www.startpage.com/do/search?q={searchTerms}",
  },
  {
    key: "yandex",
    name: "Яндекс",
    search_url: "https://yandex.ru/search/?text={searchTerms}",
  },
  {
    key: "mail.ru",
    name: "Поиск Mail.Ru",
    search_url: "https://go.mail.ru/search?q={searchTerms}",
  },
  {
    key: "metager",
    name: "MetaGer",
    search_url: "https://metager.de/meta/meta.ger3?eingabe={searchTerms}",
  },
  {
    key: "brave",
    name: "Brave",
    search_url: "https://search.brave.com/search?q={searchTerms}",
  },
];
