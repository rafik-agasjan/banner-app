"use client";

import { useObjects } from "@/store/contexts/ObjectsContext";
import TextBanner from "@/components/banners/TextBanner";
import LinkBanner from "@/components/banners/LinkBanner";

const Desc: React.FC<{
	styles: any;
}> = ({ styles }) => {

	const { _o } = useObjects();


	return (
		<div className={styles.rightBox}>
			{_o.focus === "textBanner" ? <TextBanner /> :
				_o.focus === "linkBanner" ? <LinkBanner /> :
				null
			}
			
		</div>
	);
};

export default Desc;
