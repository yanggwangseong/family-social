import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const Oauth2RedirectPage: NextPage = () => {
	const router = useRouter();

	useEffect(() => {
		router.push('/feeds');
	}, [router]);

	return <div>로그인 처리중입니다...</div>;
};

export default Oauth2RedirectPage;
