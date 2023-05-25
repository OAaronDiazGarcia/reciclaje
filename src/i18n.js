import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import DeviceInfo from 'react-native-device-info';

import translationEN from '../locales/en.json';
import translationES from '../locales/es.json';

i18n
  .use(initReactI18next)
  .init({
    lng: DeviceInfo.getDeviceLocale(), // Idioma basado en la configuración del dispositivo
    fallbackLng: 'en',
    resources: {
      en: {
        translation: translationEN,
      },
      es: {
        translation: translationES,
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
