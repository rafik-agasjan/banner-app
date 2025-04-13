"use client";

import React from "react";
import { useObjects } from "@/store/contexts/ObjectsContext";

const TextBanner: React.FC<{}> = () => {
	const { _o } = useObjects();
	const data = _o.objects.textBanner;

	return (
		<div dangerouslySetInnerHTML={{ __html: data.html(data.data) }} />
	);
};

export default TextBanner;
