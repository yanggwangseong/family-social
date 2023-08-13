import Format from '@/components/ui/layout/Format';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import axios from 'axios';
import Lottie from 'lottie-react';
import groovyWalkAnimation from '@/assets/lottie/groovyWalk.json';

const HomePage: NextPage = () => {
	useEffect(() => {
		axios.get('/api/users').then(data => console.log(data));
	}, []);
	return (
		<Format title={'main'}>
			<div>
				<div className="w-6/12 h-6/12">
					<Lottie animationData={groovyWalkAnimation} />
				</div>
				<div>로그인</div>
			</div>
		</Format>
	);
};

export default HomePage;
