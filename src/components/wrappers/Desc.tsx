"use client";

import TextBanner from "@/components/TextBanner/TextBanner";

const Desc: React.FC<{
	isProps: any;
	styles: any;
}> = ({ isProps, styles }) => {
	return (
		<div className={styles.rightBox}>
			<TextBanner data={isProps} />
		</div>
	);
};

export default Desc;
