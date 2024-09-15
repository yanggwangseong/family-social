import axios from 'axios';
import { IReportOptions, Loading, Report } from 'notiflix';
import {
	useMutation,
	UseMutationOptions,
	UseMutationResult,
} from 'react-query';

type SuccessOption = {
	title: string;
	message: string;
	buttonText: string;
	callbackOrOptions?: () => void;
	options?: IReportOptions;
};

interface CreateMutationOptions<TData, TError, TVariables, TContext>
	extends Omit<
		UseMutationOptions<TData, TError, TVariables, TContext>,
		'onMutate' | 'onSuccess' | 'onError'
	> {
	successOption: SuccessOption;
}

export function useCreateMutation<
	TData = unknown,
	TError = unknown,
	TVariables = void,
	TContext = unknown,
>(
	mutationFn: (variables: TVariables) => Promise<TData>,
	mutationOptions: CreateMutationOptions<TData, TError, TVariables, TContext>,
): UseMutationResult<TData, TError, TVariables, TContext> {
	const { successOption, ...restOptions } = mutationOptions;
	const { title, message, buttonText, callbackOrOptions, options } =
		successOption;

	return useMutation<TData, TError, TVariables, TContext>(mutationFn, {
		...restOptions,
		onMutate: variables => {
			Loading.hourglass();
			return undefined;
		},
		onSuccess: (data, variables, context) => {
			Loading.remove();
			Report.success(title, message, buttonText, callbackOrOptions, options);
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
