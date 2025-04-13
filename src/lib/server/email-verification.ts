import { generateRandomOTP } from "./utils";
import { db } from "./db";
import { ExpiringTokenBucket } from "./rate-limit";
import { encodeBase32 } from "@oslojs/encoding";
import { cookies } from "next/headers";
import { getCurrentSession } from "./session";

export function getUserEmailVerificationRequest(userId: number, id: string): EmailVerificationRequest | null {
	const row = db.queryOne(
		"SELECT id, user_id, code, email, expires_at FROM email_verification_request WHERE id = ? AND user_id = ?",
		[id, userId]
	);
	if (row === null) {
		return row;
	}
	const request: EmailVerificationRequest = {
		id: row.string(0),
		userId: row.number(1),
		code: row.string(2),
		email: row.string(3),
		expiresAt: new Date(row.number(4) * 1000)
	};
	return request;
}

export function createEmailVerificationRequest(userId: number, email: string): EmailVerificationRequest {
	deleteUserEmailVerificationRequest(userId);
	const idBytes = new Uint8Array(20);
	crypto.getRandomValues(idBytes);
	const id = encodeBase32(idBytes).toLowerCase();

	const code = generateRandomOTP();
	const expiresAt = new Date(Date.now() + 1000 * 60 * 10);
	db.queryOne(
		"INSERT INTO email_verification_request (id, user_id, code, email, expires_at) VALUES (?, ?, ?, ?, ?) RETURNING id",
		[id, userId, code, email, Math.floor(expiresAt.getTime() / 1000)]
	);

	const request: EmailVerificationRequest = {
		id,
		userId,
		code,
		email,
		expiresAt
	};
	return request;
}

export function deleteUserEmailVerificationRequest(userId: number): void {
	db.execute("DELETE FROM email_verification_request WHERE user_id = ?", [userId]);
}

export function sendVerificationEmail(email: string, code: string): void {
	console.log(`To ${email}: Your verification code is ${code}`);
}

export async function setEmailVerificationRequestCookie(request: EmailVerificationRequest): Promise<void> {
	(await cookies()).set("email_verification", request.id, {
		httpOnly: true,
		path: "/",
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		expires: request.expiresAt
	});
}

export function getDeleteEmailVerificationCookieOptions() {
    return {
        name: "email_verification",
        value: "",
        options: {
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax" as "lax",
            maxAge: 0,
        },
    };
}

export async function getUserEmailVerificationRequestFromRequest(): Promise<EmailVerificationRequest | null> {
    const { user } = await getCurrentSession();
    if (user === null) {
        return null;
    }
    const id = (await cookies()).get("email_verification")?.value ?? null;
    if (id === null) {
        return null;
    }
    const request = getUserEmailVerificationRequest(user.id, id);
    if (request === null) {
        // Tagasta juhis küpsise kustutamiseks
        const cookieOptions = getDeleteEmailVerificationCookieOptions();
        (await cookies()).set(cookieOptions.name, cookieOptions.value, cookieOptions.options);
    }
    return request;
}

export const sendVerificationEmailBucket = new ExpiringTokenBucket<number>(3, 60 * 10);

export interface EmailVerificationRequest {
	id: string;
	userId: number;
	code: string;
	email: string;
	expiresAt: Date;
}
