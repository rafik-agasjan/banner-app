import React from "react";
import type { TextBannerProps } from "@/store/data/textBanner";
import { renderHTML } from "./renderHTML";

const TextBanner: React.FC<TextBannerProps> = ({ data }) => {
	/* console.log("TextBanner data", data); */
	return <div dangerouslySetInnerHTML={{ __html: renderHTML(data) }} />;
};

export default TextBanner;
