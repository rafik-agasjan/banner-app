import { LoginForm } from "./components";
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
			<h1>Sign in</h1>
			<LoginForm />
			<Link href="/auth/signup">Create an account</Link>
			<Link href="/auth/forgot-password">Forgot password?</Link>
		</>
	);
}
