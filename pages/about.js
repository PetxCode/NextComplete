import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { getSession, signIn } from "next-auth/react";

const about = ({ user }) => {
	const [getData, setGetData] = useState([]);

	const secureMyPage = async () => {
		const session = await getSession();

		if (!session) {
			signIn("github");
		}
	};

	const fetchData = async () => {
		const url = "http://localhost:3000/api/user";
		const res = await axios.get(url);
		if (res) {
			setGetData(res.data.data);
		}
	};

	useEffect(() => {
		secureMyPage();
		fetchData();
	}, []);
	return (
		<div>
			<div>about</div>
			<Container>
				<Wrapper>
					<Holder>
						{user.map(props =>
							<Link key={props._id} href={props._id}>
								<Card>
									<Image src={props.avatar} />
								</Card>
							</Link>
						)}
					</Holder>
				</Wrapper>
			</Container>
		</div>
	);
};

export default about;

export async function getStaticProps() {
	const url = "http://localhost:3000/api/user";
	const response = await axios.get(url);
	const result = response.data.data;
	console.log(result);

	return {
		props: {
			user: result
		}
	};
}

const Image = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

const Card = styled.div`
	width: 250px;
	height: 150px;
	border-radius: 5px;
	background-color: lightgray;
	border: 1px solid silver;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 10px;

	transition: all 350ms;
	transform: scale(1);

	:hover {
		transform: scale(0.97);
		cursor: pointer;
	}
`;

const Holder = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const Container = styled.div`
	width: 100%;
	min-height: 100vh;
	height: 100%;
`;
