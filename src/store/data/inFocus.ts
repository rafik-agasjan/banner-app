import { textBanner, textBannerHTML } from "@/store/data/textBanner";
import { linkBanner, linkBannerHTML } from "@/store/data/linkBanner";

export const focus: any = {
    focus: "textBanner",
    objects: {
        textBanner: {data: textBanner, html: textBannerHTML},
        linkBanner: {data: linkBanner, html: linkBannerHTML},
    }
};