import { SOCKET_URL } from '@/constants/index';
import { setSessionStorage } from '@/utils/session-storage';
import { axiosRefreshAPI } from 'api/axios/refresh';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const GroupDetailInviteCodePage: NextPage = () => {
	const router = useRouter();

	useEffect(() => {
		setSessionStorage('init', 'on');
	}, []);

	return <div>dd</div>;
};

export default GroupDetailInviteCodePage;

export const getServerSideProps = (async context => {
	try {
		await axiosRefreshAPI();
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
