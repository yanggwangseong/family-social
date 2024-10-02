import { GroupService } from '@/services/group/group.service';
import { MemberBelongToGroupsResponse } from '@/shared/interfaces/group.interface';
import { useState } from 'react';
import { useQuery, UseQueryOptions } from 'react-query';

export interface UseMemberBelongToGroupsQueryOptions
	extends Omit<
		UseQueryOptions<
			MemberBelongToGroupsResponse[],
			unknown,
			MemberBelongToGroupsResponse[],
			string[]
		>,
		'queryKey' | 'queryFn'
	> {
	forChatCreation?: boolean;
	updateGroupId?: string;
}

export const useMemberBelongToGroups = (
	options?: UseMemberBelongToGroupsQueryOptions,
) => {
	const { updateGroupId, forChatCreation } = options || {};

	const [isSelecteGroup, setIsSelectGroup] = useState(
		updateGroupId ? updateGroupId : '',
	);

	const handleSelectedGroup = (groupId: string) => {
		setIsSelectGroup(groupId);
	};

	const { data, isLoading, ...rest } = useQuery(
		['member-belong-to-groups'],
		async () => await GroupService.getMemberBelongToGroups(forChatCreation),
		{
			...options,
		},
	);

	return {
		data,
		isLoading,
		handleSelectedGroup,
		isSelecteGroup,
		...rest,
	};
};
