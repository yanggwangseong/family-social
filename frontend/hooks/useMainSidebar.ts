import { mainSidebarAtom } from '@/atoms/mainSidebarAtom';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

export const useMainSidebar = () => {
	const [isLeftSidebarShowing, setIsLeftSidebarShowing] =
		useRecoilState(mainSidebarAtom);

	const handleCloseMainSidebar = () => {
		isLeftSidebarShowing && setIsLeftSidebarShowing(false);
	};

	return {
		isLeftSidebarShowing,
		setIsLeftSidebarShowing,
		handleCloseMainSidebar,
	};
};
