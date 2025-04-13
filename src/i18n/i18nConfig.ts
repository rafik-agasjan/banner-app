export const defaultNS = "common";
export const supportedLngs = ["et", "en", "ru"];
export const fallbackLng = "et";
export const ns = [defaultNS];

const i18nConfig = {
	defaultNS,
	supportedLngs,
	fallbackLng,
	ns,
	backend: {
		loadPath: "/locales/{{lng}}/{{ns}}.json"
	},
	detection: {
		order: ["path", "cookie", "header"],
		caches: ["cookie"]
	}
};

export default i18nConfig;
