import styles from "./page.module.css";
import Settings from "@/components/wrappers/Settings";
import Desc from "@/components/wrappers/Desc";
import { ObjectsProvider } from "@/store/contexts/ObjectsContext";

export default function Home() {
	return (
		<ObjectsProvider>
			<div className={styles.layout}>
				<div className={styles.wrapper}>
					<Settings styles={styles} />
					<Desc styles={styles} />
				</div>
			</div>
		</ObjectsProvider>
		
	);
}
