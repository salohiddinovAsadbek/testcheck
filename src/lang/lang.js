import { createI18n } from "vue-i18n";
import lang from "../utils/lang.json";

const DEFAULT_LANG = "en";

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: "en",
  fallbackLocale: DEFAULT_LANG,
  messages: lang,
});
