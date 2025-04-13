import { SignUpForm } from "./components";
import Link from "next/link";

import { getCurrentSession } from "@/lib/server/session";
import { redirect } from "next/navigation";
import { globalGETRateLimit } from "@/lib/server/request";

export default async function Page() {
	if (!globalGETRateLimit()) {
		return "Too many requests";
	}
	const { session, user } = await getCurrentSession();
	if (session !== null) {
		if (!user.emailVerified) {
			return redirect("/auth/verify-email");
		}
		if (!user.registered2FA) {
			return redirect("/auth/2fa/setup");
		}
		if (!session.twoFactorVerified) {
			return redirect("/auth/2fa");
		}
		return redirect("/");
	}
	return (
		<>
			<h1>Create an account</h1>
			<p>Your username must be at least 3 characters long and your password must be at least 8 characters long.</p>
			<SignUpForm />
			<Link href="/auth/login">Sign in</Link>
		</>
	);
}
