import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

const detailed = () => {
	const router = useRouter();
	const [getData, setGetData] = useState([]);

	const id = router.query.id;
	console.log(id);
	const fetchData = async () => {
		const url = `http://localhost:3000/api/user/${id}`;
		const res = await axios.get(`${url}`);
		if (res) {
			setGetData(res.data.data);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);
	return (
		<div>
			<div>about</div>
			<Container>
				<Wrapper>
					<Holder>
						<Card>
							<Image src={getData.avatar} />
						</Card>
						<div>
							{getData.name}
						</div>
						<div>
							{getData.gender}
						</div>
						<div>
							{getData.address}
						</div>
						<div>
							{getData.contact}
						</div>
					</Holder>
				</Wrapper>
			</Container>
		</div>
	);
};

export default detailed;

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
	flex-direction: column;
	align-items: center;
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
