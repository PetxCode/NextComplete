import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const Headers = () => {
	const { data: session } = useSession();

	console.log(session);

	return (
		<div>
			<Container>
				<Wrapper>
					<Navigation>
						<Logo src="/log.svg" />
						{session
							? <Link href="/">
									<Nav>Home</Nav>
								</Link>
							: null}
						<Link href="/about">
							<Nav>About</Nav>
						</Link>
					</Navigation>
					<Navigation>
						{!session
							? <Link href="/api/auth/signin">
									<Nav
										onClick={e => {
											e.preventDefault();
											signIn("github");
										}}
									>
										Sign In
									</Nav>
								</Link>
							: <Link href="/api/auth/signout">
									<Nav
										onClick={e => {
											e.preventDefault();
											signOut("github");
										}}
									>
										Log Out
									</Nav>
								</Link>}
					</Navigation>
				</Wrapper>
			</Container>
		</div>
	);
};

export default Headers;

const Nav = styled.a`
	padding: 12px 30px;
	background-color: white;
	color: black;
	border-radius: 2px;
	font-weight: bold;
	font-size: 12px;
	text-transform: uppercase;
	margin: 0 10px;

	transition: all 350ms;
	transform: scale(1);

	:hover {
		transform: scale(0.97);
		cursor: pointer;
	}
`;

const Logo = styled.img`
	width: 150px;
	height: 50px;
	object-fit: contain;
	margin: 0 20px;
	transition: all 350ms;
	transform: scale(1);

	:hover {
		transform: scale(1.05);
		cursor: pointer;
	}
`;

const Navigation = styled.div`
	display: flex;
	align-items: center;
`;

const Wrapper = styled.div`
	width: 100%;
	height: 80px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 20px;
`;

const Container = styled.div`
	width: 100%;
	height: 80px;
	background-color: black;
	color: white;
`;
