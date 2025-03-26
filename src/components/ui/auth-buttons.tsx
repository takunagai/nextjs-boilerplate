"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export function AuthButtons() {
	const { data: session, status } = useSession();

	if (status === "loading") {
		return <p>...</p>;
	}

	if (session) {
		return (
			<div>
				<p>ようこそ、{session.user?.name}さん</p>
				<button type="button" onClick={() => signOut()}>サインアウト</button>
			</div>
		);
	}

	return <button type="button" onClick={() => signIn()}>サインイン</button>;
}
