import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import i18nConfig from "./i18nConfig";

export default async function initTranslations(lng: string, config = i18nConfig) {
	if (!i18next.isInitialized) {
		await i18next
			.use(
				resourcesToBackend((language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`))
			)
			.init({
				...config,
				lng,
				preload: config.supportedLngs,
				initImmediate: false
			});
	} else {
		// Kui juba initsialiseeritud, muuda keel
		await i18next.changeLanguage(lng);
	}

	return i18next;
}
