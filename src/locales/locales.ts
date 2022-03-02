import { pick } from "in-browser-language";
import caES from "./lang/ca-ES.json";
import cs from "./lang/cs.json";
import de from "./lang/de.json";
import el from "./lang/el.json";
import enAU from "./lang/en-AU.json";
import enGB from "./lang/en-GB.json";
import es from "./lang/es.json";
import fa from "./lang/fa.json";
import fi from "./lang/fi.json";
import fr from "./lang/fr.json";
import gd from "./lang/gd.json";
import gu from "./lang/gu.json";
import hi from "./lang/hi.json";
import hu from "./lang/hu.json";
import id from "./lang/id.json";
import it from "./lang/it.json";
import ja from "./lang/ja.json";
import ko from "./lang/ko.json";
import lt from "./lang/lt.json";
import lb from "./lang/lb.json";
import ne from "./lang/ne.json";
import nl from "./lang/nl.json";
import no from "./lang/no.json";
import ro from "./lang/ro.json";
import ru from "./lang/ru.json";
import sk from "./lang/sk.json";
import sr from "./lang/sr.json";
import sv from "./lang/sv.json";
import pl from "./lang/pl.json";
import pt from "./lang/pt.json";
import ptBR from "./lang/pt-BR.json";
import ta from "./lang/ta.json";
import th from "./lang/th.json";
import tr from "./lang/tr.json";
import vi from "./lang/vi.json";
import zhCN from "./lang/zh-CN.json";
import zhTW from "./lang/zh-TW.json";
import uk from "./lang/uk.json";

export const messages: Record<string, Record<string, string>> = {
  "ca-ES": caES,
  cs: cs,
  de: de,
  el: el,
  en: {},
  "en-AU": enAU,
  "en-GB": enGB,
  es: es,
  fa: fa,
  fi: fi,
  fr: fr,
  gd: gd,
  gu: gu,
  hi: hi,
  hu: hu,
  id: id,
  it: it,
  ja: ja,
  ko: ko,
  lt: lt,
  lb: lb,
  ne: ne,
  nl: nl,
  no: no,
  ro: ro,
  ru: ru,
  sk: sk,
  sr: sr,
  sv: sv,
  pl: pl,
  pt: pt,
  "pt-BR": ptBR,
  ta: ta,
  th: th,
  tr: tr,
  vi: vi,
  zh: {},
  "zh-CN": zhCN,
  "zh-TW": zhTW,
  uk: uk,
};

export const locales = Object.keys(messages);
export const defaultLocale = pick(locales, "en");
