import { sharedFamIdsAtom } from '@/atoms/sharedFamIdsAtom';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

export const useSharedFamIds = () => {
	const [isSharedFamIds, setIsSharedFamIds] = useRecoilState(sharedFamIdsAtom);

	const handleSharedFamIds = (famIds: string[]) => {
		setIsSharedFamIds([...famIds]);
	};

	return {
		isSharedFamIds,
		handleSharedFamIds,
	};
};
