import i18n from "i18next";
import { I18n as I18nAmplify } from 'aws-amplify';
import { initReactI18next } from "react-i18next";

import dicionary from './assets/translate';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      ...dicionary,
    },
    lng: "ptbr",
    fallbackLng: "ptbr",
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  });

I18nAmplify.setLanguage('ptbr')
I18nAmplify.putVocabularies(dicionary)

export default i18n;