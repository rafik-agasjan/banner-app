import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { textBanner, textBannerHTML } from "@/store/data/textBanner";


// OPTIONS request for CORS
export async function OPTIONS() {
	return new NextResponse(null, {
		status: 200,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type",
			"Access-Control-Max-Age": "86400"
		}
	});
}

// POST request to render HTML
export async function POST(req: NextRequest) {
	const body = await req.json();
	const props = {
		...textBanner,
		extras: {
			key: body?.key || "no-key",
			user: body?.user || "no-user",
			message: body?.message || "no-message"
		}
	};

	// Renderdame lihtsalt Server Componenti
	const html = `
      <div id="my-embedded-component">
        ${textBannerHTML(props)}
      </div>
    `;

	return new NextResponse(html, {
		status: 200,
		headers: {
			"Content-Type": "text/html",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type"
		}
	});
}
