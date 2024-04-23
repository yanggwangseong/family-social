import { mainSidebarAtom } from '@/atoms/mainSidebarAtom';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useIsMobile } from './useIsMobile';

export const useMainSidebar = () => {
	const [isLeftSidebarShowing, setIsLeftSidebarShowing] =
		useRecoilState(mainSidebarAtom);

	const { isMobile } = useIsMobile();

	const handleCloseMainSidebar = () => {
		if (isMobile) {
			isLeftSidebarShowing && setIsLeftSidebarShowing(false);
		}
	};

	// // PC 환경에서는 항상 사이드바를 보여주기 위해 isMobile 상태에 따라 값 설정
	useEffect(() => {
		if (!isMobile) {
			setIsLeftSidebarShowing(true);
		} else {
			setIsLeftSidebarShowing(false);
		}
	}, [isMobile, setIsLeftSidebarShowing]);

	return {
		isLeftSidebarShowing,
		setIsLeftSidebarShowing,
		handleCloseMainSidebar,
		isMobile,
	};
};
