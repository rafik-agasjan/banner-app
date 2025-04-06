export const defaultNS = 'common';
export const supportedLngs = ['et', 'en', 'ru'];
export const fallbackLng = 'et';
export const ns = [defaultNS];

export default {
  defaultNS,
  supportedLngs,
  fallbackLng,
  ns,
  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json',
  },
  detection: {
    order: ['path', 'cookie', 'header'],
    caches: ['cookie'],
  },
};