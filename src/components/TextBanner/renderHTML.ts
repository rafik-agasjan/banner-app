export const renderHTML = (data: any) => {
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
            <div
                style="
                    font-size: ${data.textSize?.value}px;
                    font-weight: ${data.textWeight?.value};
                    color: ${data.textColor?.value};
                "
            >
                ${data.text?.value}
            </div>
        </div>
    `;
}