"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { textBanner } from "@/store/data/textBanner";
import Settings from "@/components/wrappers/Settings";
import Desc from "@/components/wrappers/Desc";

export default function Home() {
	const [isProps, setProps] = useState<any>({});

	useEffect(() => {
		setProps(textBanner);
	}, []);

	/* useEffect(() => {
    console.log(isProps);
  }, [isProps]); */

	return (
		<div className={styles.layout}>
			<div className={styles.wrapper}>
				<Settings isProps={isProps} setProps={setProps} styles={styles} />
				<Desc isProps={isProps} styles={styles} />
			</div>
		</div>
	);
}
