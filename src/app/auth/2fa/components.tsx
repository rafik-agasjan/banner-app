"use client";

import { verify2FAAction } from "./actions";
import { useActionState } from "react";

const initial2FAVerificationState = {
	message: ""
};

export function TwoFactorVerificationForm() {
	const [state, action] = useActionState(verify2FAAction, initial2FAVerificationState);
	return (
		<form action={action}>
			<label htmlFor="form-totp.code">Code</label>
			<input
                id="form-totp.code"
                name="code"
                autoComplete="one-time-code"
                required
                onChange={(e) => {
                    // Handle input changes here if needed
                }}
            />
			<br />
			<button>Verify</button>
			<p>{state.message}</p>
		</form>
	);
}
