import 'dayjs/locale/en';
import 'dayjs/locale/vi';

import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import { LOCAL_STORAGE } from './constants/global';

dayjs.extend(localizedFormat);

const language = localStorage.getItem(LOCAL_STORAGE.LANGUAGE) || 'vi';

const setDayjsLocale = (lng) => {
  switch (lng) {
    case 'vi':
      dayjs.locale('vi');
      break;
    // Add more cases for additional languages
    default:
      dayjs.locale('vi');
  }
};

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(
    {
      lng: language,
      supportedLngs: ['en', 'vi'],
      fallbackLng: 'vi',
      debug: false,
      detection: {
        order: [
          'localStorage',
          'cookie',
          'queryString',
          'navigator',
          'htmlTag',
          'path',
          'subdomain',
        ],
        caches: ['localStorage'],
      },
      backend: {
        loadPath: '/locales/{{lng}}/translation.json',
      },
      react: {
        useSuspense: true,
      },
      // Add a callback to update the Day.js locale when the language changes
      interpolation: {
        escapeValue: false,
      },
      initImmediate: false, // Prevents async initialization causing issues with dayjs locale setting
    },
    (err, _t) => {
      if (err) return console.error(err);
      // setDayjsLocale(i18n.language);
    }
  );

i18n.on('languageChanged', (lng) => {
  // setDayjsLocale(lng);
});

export default i18n;
