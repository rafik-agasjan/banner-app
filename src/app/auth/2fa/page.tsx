import Link from "next/link";

import { TwoFactorVerificationForm } from "./components";
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
	if (session.twoFactorVerified) {
		return redirect("/");
	}
	return (
		<>
			<h1>Two-factor authentication</h1>
			<p>Enter the code from your authenticator app.</p>
			<TwoFactorVerificationForm />
			<Link href="/auth/2fa/reset">Use recovery code</Link>
		</>
	);
}
