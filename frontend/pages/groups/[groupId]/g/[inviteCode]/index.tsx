import InviteCode from '@/components/screens/group/invite-code/InviteCode';
import { SOCKET_URL, SSR_API_URL } from '@/constants/index';
import { setSessionStorage } from '@/utils/session-storage';

import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';

import React, { useEffect } from 'react';

const GroupDetailInviteCodePage: NextPage = () => {
	useEffect(() => {
		setSessionStorage('init', 'on');
	}, []);

	return <InviteCode />;
};

export default GroupDetailInviteCodePage;

export const getServerSideProps = (async context => {
	const cookie = context.req.headers.cookie || '';
	// 쿠키 문자열을 개별 쿠키로 분리
	const cookiesArray = cookie?.split(';');

	// Authentication 쿠키 찾기
	const authenticationCookie = cookiesArray?.find(cookie =>
		cookie.trim().startsWith('Authentication='),
	);

	const axiosInstance = axios.create({
		baseURL: SSR_API_URL,
		withCredentials: true,
		headers: {
			Cookie: authenticationCookie || '', // Authentication 쿠키만 추가
		},
	});

	try {
		await axiosInstance.post('/auth/refreshtoken');
	} catch (error) {
		return {
			redirect: {
				destination: `/?redirect_url=${SOCKET_URL}${context.req.url}`,
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
}) satisfies GetServerSideProps;
