import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import sk from '../public/locales/sk/common.json';
import en from '../public/locales/en/common.json';

i18n.use(initReactI18next).init({
  resources: {
    sk: { common: sk },
    en: { common: en },
  },
  lng: 'sk',
  fallbackLng: 'sk',
  interpolation: { escapeValue: false },
});

export default i18n;
