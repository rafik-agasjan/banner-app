"use client";

import { setup2FAAction } from "./actions";
import { useActionState } from "react";

const initial2FASetUpState = {
	message: ""
};

export function TwoFactorSetUpForm(props: { encodedTOTPKey: string }) {
	const [state, action] = useActionState(setup2FAAction, initial2FASetUpState);
	return (
		<form action={action}>
			<input name="key" value={props.encodedTOTPKey} hidden required />
			<label htmlFor="form-totp.code">Verify the code from the app</label>
			<input
				id="form-totp.code"
				name="code"
				required
				onChange={(e) => ""}
			/>
			<br />
			<button>Save</button>
			<p>{state.message}</p>
		</form>
	);
}
