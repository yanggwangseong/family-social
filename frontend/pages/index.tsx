import Format from '@/components/ui/layout/Format';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import axios from 'axios';
import Lottie from 'lottie-react';
import groovyWalkAnimation from '@/assets/lottie/groovyWalk.json';
import { Report } from 'notiflix/build/notiflix-report-aio';

const HomePage: NextPage = () => {
	useEffect(() => {
		const response = axios.get('/api/users').then(data => console.log(data));
	}, []);

	const handleClick = () => {
		Report.success('Title', 'Message', '확인');
	};

	return (
		<Format title={'main'}>
			<div>
				<div className="w-6/12 h-3/6">
					<Lottie animationData={groovyWalkAnimation} />
				</div>
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
