import axios from 'axios';
import { Loading, Report } from 'notiflix';
import { useState } from 'react';
import { useMutation, UseMutationOptions } from 'react-query';

interface CustomMutationOptions<TData, TError, TVariables, TContext>
	extends Omit<
		UseMutationOptions<TData, TError, TVariables, TContext>,
		'onMutate' | 'onSuccess' | 'onError'
	> {
	successMessage?: string;
	onSuccessCallback?: (data: TData) => void;
}

export const useCreateMutation = <
	TData = unknown,
	TError = unknown,
	TVariables = void,
	TContext = unknown,
>(
	mutationFn: (variables: TVariables) => Promise<TData>,
	options: CustomMutationOptions<TData, TError, TVariables, TContext>,
) => {
	const { successMessage, onSuccessCallback, ...restOptions } = options;

	return useMutation<TData, TError, TVariables, TContext>(mutationFn, {
		...restOptions,
		onMutate: () => {
			Loading.hourglass();
			return undefined;
		},
		onSuccess: data => {
			Loading.remove();
			Report.success(
				'성공',
				successMessage || '작업이 성공적으로 완료되었습니다.',
				'확인',
			);
			if (onSuccessCallback) {
				onSuccessCallback(data);
			}
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
};
