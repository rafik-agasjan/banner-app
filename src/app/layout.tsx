// filepath: c:\Users\rafik\Desktop\banner-app\src\app\layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { initTranslations } from "@/i18n";
import { i18nConfig } from "@/i18n";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Minu veebileht",
	description: "Tere tulemast!"
};

async function RootLayout({ children, params: { lng } }: { children: React.ReactNode; params: { lng: string } }) {
	if (!i18nConfig.supportedLngs.includes(lng)) {
		return (
			<html lang={i18nConfig.fallbackLng}>
				<head>
					<title>{metadata.title}</title>
					<meta name="description" content={metadata.description} />
				</head>
				<body className={inter.className}>{children}</body>
			</html>
		);
	}

	await initTranslations(lng);

	return (
		<html lang={lng}>
			<head>
				<title>{metadata.title}</title>
				<meta name="description" content={metadata.description} />
			</head>
			<body className={inter.className}>
				<Suspense fallback={<div>Laadin...</div>}>{children}</Suspense>
			</body>
		</html>
	);
}

export default RootLayout;
