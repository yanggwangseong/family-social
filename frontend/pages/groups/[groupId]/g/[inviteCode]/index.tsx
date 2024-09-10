import InviteCode from '@/components/screens/group/invite-code/InviteCode';
import { SOCKET_URL } from '@/constants/index';
import { GroupDetailResponse } from '@/shared/interfaces/fam.interface';
import { setSessionStorage } from '@/utils/session-storage';
import { AxiosResponse } from 'axios';

import {
	withAuthServerSideProps,
	WithAuthServerSidePropsContext,
} from 'hoc/with-auth-server-side-props';
import { NextPage } from 'next';

import React, { useEffect } from 'react';

const GroupDetailInviteCodePage: NextPage = () => {
	useEffect(() => {
		setSessionStorage('init', 'on');
	}, []);

	return <InviteCode />;
};

export default GroupDetailInviteCodePage;

export const getServerSideProps = withAuthServerSideProps(async context => {
	const { axiosInstance, query } =
		context as unknown as WithAuthServerSidePropsContext;

	const { groupId, inviteCode } = query as {
		groupId: string;
		inviteCode: string;
	};

	const { data } = await axiosInstance.get<GroupDetailResponse>(
		`/groups/${groupId}`,
	);

	if (data.invitationAccepted === true) {
		// 이미 가입한 상태라면 group디테일 페이지로 이동
		return {
			redirect: {
				destination: `/groups/${groupId}`,
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
});

// export const getServerSideProps = (async context => {
// 	const cookie = context.req.headers.cookie || '';
// 	// 쿠키 문자열을 개별 쿠키로 분리
// 	const cookiesArray = cookie?.split(';');

// 	// Authentication 쿠키 찾기
// 	const authenticationCookie = cookiesArray?.find(cookie =>
// 		cookie.trim().startsWith('Authentication='),
// 	);

// 	const axiosInstance = axios.create({
// 		baseURL: SSR_API_URL,
// 		withCredentials: true,
// 		headers: {
// 			Cookie: authenticationCookie || '', // Authentication 쿠키만 추가
// 		},
// 	});

// 	try {
// 		await axiosInstance.post('/auth/refreshtoken');
// 	} catch (error) {
// 		return {
// 			redirect: {
// 				destination: `/?redirect_url=${SOCKET_URL}${context.req.url}`,
// 				permanent: false,
// 			},
// 		};
// 	}

// 	return {
// 		props: {},
// 	};
// }) satisfies GetServerSideProps;
