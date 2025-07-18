import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load translations directly
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const en = JSON.parse(fs.readFileSync(path.join(__dirname, 'public/locales/en/common.json'), 'utf8'));
const fr = JSON.parse(fs.readFileSync(path.join(__dirname, 'public/locales/fr/common.json'), 'utf8'));

/** @type {import('astro-i18next').AstroI18nextConfig} */
export default {
  defaultLocale: "en",
  locales: ["en", "fr"],
  showDefaultLocale: false,
  namespaces: ["common"],
  defaultNamespace: "common",
  load: ["server", "client"],
  i18nextServer: {
    debug: true,
    lng: "en",
    fallbackLng: "en",
    resources: {
      en: { common: en },
      fr: { common: fr }
    },
  },
  i18nextClient: {
    debug: true,
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
  },
};
