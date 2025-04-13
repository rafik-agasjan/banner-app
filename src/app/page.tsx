import { LogoutButton } from "./components";
import Link from "next/link";

import { getCurrentSession } from "@/lib/server/session";
import { redirect } from "next/navigation";
import { globalGETRateLimit } from "@/lib/server/request";

export default async function Page() {
	if (!globalGETRateLimit()) {
		return "Too many requests";
	}
	const { session, user } = await getCurrentSession();
	if (session === null) {
		return redirect("/auth/login");
	}
	if (!user.emailVerified) {
		return redirect("/auth/verify-email");
	}
	if (!user.registered2FA) {
		return redirect("/auth/2fa/setup");
	}
	if (!session.twoFactorVerified) {
		return redirect("/auth/2fa");
	}
	return (
		<>
			<header>
				<Link href="/">Home</Link>
				<Link href="/auth/settings">Settings</Link>
			</header>
			<main>
				<h1>Hi {user.username}!</h1>
				<LogoutButton />
			</main>
		</>
	);
}
