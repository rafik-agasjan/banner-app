"use client";

import { useClientTranslation } from "@/i18n";
import { useObjects } from "@/store/contexts/ObjectsContext";
import ObjectHandler from "./ObjectHandler";


const Settings: React.FC<{
	styles: any;
}> = ({ styles }) => {
	const { t } = useClientTranslation();
	const { _o, setObjects } = useObjects();

	const isAssortment = Object.keys(_o.objects).map((item: any) => item);

	return (
		<>
			<div className={styles.leftBox}>
				<div className={styles.objectHandler}>
					<div className={styles.objectHandlerTitle}>{t("assortment")}</div>

					<select
						defaultValue={t(_o.focus)}
						className={styles.select}
						onChange={(e) => setObjects((prev: any) => ({...prev, focus: e.target.value}))}
					>
						{isAssortment.map((item: string, index: number) => (
							<option key={index + "xxx"} value={item} className={styles.option}>
								{t(item)}
							</option>
						))}
					</select>
				</div>

				<ObjectHandler styles={styles} />
			</div>		
		</>
	);
};

export default Settings;
