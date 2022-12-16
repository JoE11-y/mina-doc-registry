import React from "react"
import Link from 'next/link';
import { Status } from "./Status";

export const Header = () => {
	return (
		<>
			<header id="menu" className="heading">
				<Link href="/" id="linkHome">
					Home
				</Link>
				<Link href="/submit-document" id="linkSubmitDocument">
					Submit Document
				</Link>
				<Link href="/verify-document" id="linkVerifyDocument">
					Verify Document
				</Link>
			</header>
			<Status />
		</>
	)
}
