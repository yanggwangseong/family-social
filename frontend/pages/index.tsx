import Format from '@/components/ui/layout/Format';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import axios from 'axios';
import Lottie from 'lottie-react';
import groovyWalkAnimation from '@/assets/lottie/groovyWalk.json';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { useRecoilState } from 'recoil';
import { todoAtom } from '../atoms';
import { useQuery } from 'react-query';

const HomePage: NextPage = () => {
	const { data, isLoading, isError } = useQuery(
		['main'],
		async () => await axios.get('/api/users'),
	);

	useEffect(() => {
		const response = axios.get('/api/users').then();
	}, []);

	const [text, setText] = useRecoilState(todoAtom);

	const handleClick = () => {
		Report.success('Title', 'Message', '확인');
		setText('아톰상태변경 확인!');
	};

	return (
		<Format title={'main'}>
			<div className="flex items-center justify-center">
				<div className="w-1/4 h-1/4">
					<Lottie animationData={groovyWalkAnimation} />
				</div>
				<div>{data?.data.data}</div>
				<div>{text}</div>
				<div>
					<button type="button" onClick={handleClick}>
						클릭!
					</button>
				</div>
			</div>
		</Format>
	);
};

export default HomePage;
