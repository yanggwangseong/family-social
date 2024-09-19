import axios from 'axios';
import { Loading, Report } from 'notiflix';
import {
	useMutation,
	UseMutationOptions,
	UseMutationResult,
} from 'react-query';

interface CreateMutationOptions<TData, TError, TVariables, TContext>
	extends Omit<
		UseMutationOptions<TData, TError, TVariables, TContext>,
		'onMutate' | 'onError'
	> {}

export function useCreateMutation<
	TData = unknown,
	TError = unknown,
	TVariables = void,
	TContext = unknown,
>(
	mutationFn: (variables: TVariables) => Promise<TData>,
	mutationOptions: CreateMutationOptions<TData, TError, TVariables, TContext>,
): UseMutationResult<TData, TError, TVariables, TContext> {
	const { ...restOptions } = mutationOptions;

	return useMutation<TData, TError, TVariables, TContext>(mutationFn, {
		...restOptions,
		onMutate: variables => {
			Loading.hourglass();
			return undefined;
		},
		onError: error => {
			if (axios.isAxiosError(error)) {
				Report.warning(
					'실패',
					`${error.response?.data.message || '오류가 발생했습니다.'}`,
					'확인',
					() => Loading.remove(),
				);
			}
		},
	});
}
