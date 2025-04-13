export interface LinkBannerData {
	text: { type: string; value: string };
    href: { type: string; value: string };
	textColor: { type: string; value: string };
	textSize: { type: string; value: string };
	textWeight: { type: string; value: string };
	backgroundType: { type: string; data: string[]; value: string };
	backgroundColor: { type: string; value: string };
	backgroundImage: { type: string; value: string };
	backgroundImageSize: { type: string; data: string[]; value: string };
	backgroundImageRepeat: { type: string; data: string[]; value: string };
	position: { type: string; data: string[]; value: string };
}

export const linkBanner: LinkBannerData = {
    text: { type: "textarea", value: "See on link..." },
    href: { type: "string", value: "#" },
    textColor: { type: "color", value: "#000000" },
    textSize: { type: "number", value: "16" },
    textWeight: { type: "number", value: "500" },
    backgroundType: { type: "select", data: ["color", "image"], value: "color" },
    backgroundColor: { type: "color", value: "#FFFFFF" },
    backgroundImage: {
        type: "string",
        value: "https://th.bing.com/th/id/OIP.WCPMLsoLhFtrSzMc9UJKjAHaHa?rs=1&pid=ImgDetMain"
    },
    backgroundImageSize: { type: "select", data: ["contain", "cover"], value: "cover" },
    backgroundImageRepeat: { type: "select", data: ["no-repeat", "repeat"], value: "repeat" },
    position: { type: "select", data: ["top", "bottom"], value: "top" },
};

export const linkBannerHTML = (data: LinkBannerData) => {
	return `
        <div
            style="
                width: 100%;
                height: auto;
                min-height: 60px;
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden;
                position: absolute;
                top: ${data.position?.value === "top" ? 0 : "auto"};
                bottom: ${data.position?.value === "bottom" ? 0 : "auto"};
                background-color: ${data.backgroundType?.value === "color" ? data.backgroundColor.value : "none"};
                background-image: ${data.backgroundType?.value === "image" ? `url(${data.backgroundImage.value})` : "none"};
                background-size: ${data.backgroundType?.value === "image" ? data.backgroundImageSize.value : "none"};
                background-repeat: ${data.backgroundType?.value === "image" ? data.backgroundImageRepeat.value : "none"};
            "
        >
            <a
                href="${data.href?.value}"
                style="
                    font-size: ${data.textSize?.value}px;
                    font-weight: ${data.textWeight?.value};
                    color: ${data.textColor?.value};
                "
            >
                ${data.text?.value}
            </a>
        </div>
    `;
};
