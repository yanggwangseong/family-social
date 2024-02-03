import { GroupService } from '@/services/group/group.service';
import { useState } from 'react';
import { useQuery } from 'react-query';

export const useMemberBelongToGroups = (updateGroupId?: string) => {
	const [isSelecteGroup, setIsSelectGroup] = useState(
		updateGroupId ? updateGroupId : '',
	);

	const handleSelectedGroup = (groupId: string) => {
		setIsSelectGroup(groupId);
	};

	const { data, isLoading } = useQuery(
		['member-belong-to-groups'],
		async () => await GroupService.getMemberBelongToGroups(),
	);

	return {
		data,
		isLoading,
		handleSelectedGroup,
		isSelecteGroup,
	};
};
