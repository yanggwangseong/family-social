import ScheduleCreate from '@/components/screens/schedule/create/ScheduleCreate';
import { ScheduleService } from '@/services/schedule/schedule.service';
import { ScheduleItemResponse } from '@/shared/interfaces/schedule.interface';
import { axiosAPI, axiosClassic } from 'api/axios';
import { AxiosError } from 'axios';
import { GetServerSideProps, NextPage } from 'next';

import React from 'react';
import { QueryClient, dehydrate, useQuery } from 'react-query';

import Error from 'next/error';
import { useRouter } from 'next/router';
import Skeleton from '@/components/ui/skeleton/Skeleton';
import {
	withAuthServerSideProps,
	WithAuthServerSidePropsContext,
} from 'hoc/with-auth-server-side-props';

const ScheduleEditPage: NextPage<{ err: boolean; status: number }> = ({
	err,
	status,
}) => {
	const router = useRouter();

	const query = router.query as { scheduleId: string };

	const { data, isLoading } = useQuery(
		['get-scheduleId', query.scheduleId],
		async () =>
			await ScheduleService.getScheduleById(
				'75aca3da-1dac-48ef-84b8-cdf1be8fe37d',
				query.scheduleId,
			),
	);

	if (err) {
		return <Error statusCode={status} />;
	}

	if (isLoading) return <Skeleton></Skeleton>;
	if (!data) return <Skeleton></Skeleton>;

	return <ScheduleCreate scheduleItem={data} />;
};

export default ScheduleEditPage;

export const getServerSideProps = withAuthServerSideProps(async context => {
	const queryClient = new QueryClient();
	const { axiosInstance, query, params } =
		context as unknown as WithAuthServerSidePropsContext;
	const { scheduleId } = params as { scheduleId: string };

	try {
		await queryClient.fetchQuery<ScheduleItemResponse>(
			['get-scheduleId', scheduleId],
			async () => {
				const { data } = await axiosInstance.get<ScheduleItemResponse>(
					`/groups/75aca3da-1dac-48ef-84b8-cdf1be8fe37d/schedules/${scheduleId}`,
				);

				return data;
			},
		);

		return {
			props: {
				dehydratedState: dehydrate(queryClient),
			},
		};
	} catch (err: any) {
		return {
			props: {
				status: err.response.data.status,
				err: !err.response.data.success,
			},
		};
	}
});

// export const getServerSideProps = (async context => {
// 	const queryClient = new QueryClient();
// 	const { scheduleId } = context.params as { scheduleId: string };

// 	const cookie = context.req ? context.req.headers.cookie : '';
// 	// 쿠키 문자열을 개별 쿠키로 분리
// 	const cookiesArray = cookie?.split(';');

// 	// Authorization 쿠키 찾기
// 	const authorizationCookie = cookiesArray?.find(cookie =>
// 		cookie.trim().startsWith('Authorization='),
// 	);

// 	// Authorization 쿠키가 존재하면 값을 추출
// 	const authorizationValue = authorizationCookie
// 		? authorizationCookie.split('=')[1]
// 		: '';

// 	axiosAPI.defaults.headers.common[
// 		'Authorization'
// 	] = `Bearer ${authorizationValue.trim()}`;

// 	try {
// 		await queryClient.fetchQuery<ScheduleItemResponse>(
// 			['get-scheduleId', scheduleId],
// 			async () => {
// 				const { data } = await axiosAPI.get<ScheduleItemResponse>(
// 					`/groups/75aca3da-1dac-48ef-84b8-cdf1be8fe37d/schedules/${scheduleId}`,
// 				);

// 				return data;
// 			},
// 		);

// 		return {
// 			props: {
// 				dehydratedState: dehydrate(queryClient),
// 			},
// 		};
// 	} catch (err: any) {
// 		return {
// 			props: {
// 				status: err.response.data.status,
// 				err: !err.response.data.success,
// 			},
// 		};
// 	}
// }) satisfies GetServerSideProps;
