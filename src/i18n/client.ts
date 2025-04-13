"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import i18nConfig from "./i18nConfig";
import { useTranslation } from "react-i18next";

export function useClientTranslation(ns: string = "common") {
	const { t, i18n } = useTranslation(ns);
	return { t, i18n };
}

if (!i18n.isInitialized) {
	i18n
		.use(initReactI18next)
		.use(resourcesToBackend((language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`)))
		.init({
			...i18nConfig,
			lng: i18nConfig.fallbackLng,
			preload: i18nConfig.supportedLngs
		});
}

export default i18n;
