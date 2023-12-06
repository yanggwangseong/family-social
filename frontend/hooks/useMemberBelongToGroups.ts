import { GroupService } from '@/services/group/group.service';
import { useState } from 'react';
import { useQuery } from 'react-query';

export const useMemberBelongToGroups = () => {
	const [isSelecteGroup, setIsSelectGroup] = useState('');

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
