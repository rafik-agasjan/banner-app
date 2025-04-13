"use client";

import React from "react";
import { useObjects } from "@/store/contexts/ObjectsContext";

const LinkBanner: React.FC<{}> = () => {
    const { _o } = useObjects();
    const data = _o.objects.linkBanner;

    return (
        <div dangerouslySetInnerHTML={{ __html: data.html(data.data) }} />
    );
};

export default LinkBanner;
