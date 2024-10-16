import { GroupService } from '@/services/group/group.service';
import { GroupDetailResponse } from '@/shared/interfaces/fam.interface';
import { useQuery, UseQueryOptions } from 'react-query';

export interface GroupDetailQueryOptions
	extends Omit<
		UseQueryOptions<
			GroupDetailResponse,
			unknown,
			GroupDetailResponse,
			string[]
		>,
		'queryKey' | 'queryFn'
	> {}

export const useGroupDetailQuery = (
	groupId: string,
	options?: GroupDetailQueryOptions,
) => {
	const { data, isLoading, ...rest } = useQuery(
		['get-group-detail', groupId],
		async () => await GroupService.getGroupDetail(groupId),
		{
			...options,
		},
	);

	return {
		groupDetail: data,
		groupDetailLoading: isLoading,
		...rest,
	};
};
