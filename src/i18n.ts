import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTranslations from './i18n/en.json'
import heTranslations from './i18n/he.json'

const resources = {
  en: {
    translation: enTranslations
  },
  he: {
    translation: heTranslations
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  }).catch((e: any) => { console.log(e) })

export default i18n
