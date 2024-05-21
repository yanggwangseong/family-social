import { sharedFamIdsAtom } from '@/atoms/sharedFamIdsAtom';
import { MembersBelongToGroupResponse } from '@/shared/interfaces/member.interface';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export const useSharedFamIds = (members?: MembersBelongToGroupResponse[]) => {
	const [isSharedFamIds, setIsSharedFamIds] = useRecoilState(sharedFamIdsAtom);

	const handleSharedFamIds = (famIds: string[]) => {
		setIsSharedFamIds([...famIds]);
	};

	useEffect(() => {
		if (members) {
			setIsSharedFamIds(members.map(item => item.id));
		}
	}, [members, setIsSharedFamIds]);

	return {
		isSharedFamIds,
		handleSharedFamIds,
	};
};
