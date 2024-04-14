import { mainSidebarAtom } from '@/atoms/mainSidebarAtom';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export const useMainSidebar = () => {
	const [isLeftSidebarShowing, setIsLeftSidebarShowing] =
		useRecoilState(mainSidebarAtom);

	const [isMobile, setIsMobile] = useState(false);

	const handleCloseMainSidebar = () => {
		isLeftSidebarShowing && setIsLeftSidebarShowing(false);
	};

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768); // 예시: 모바일 화면 너비가 768px 이하인 경우를 기준으로 설정
		};

		handleResize(); // 처음 렌더링시 사이즈에 따라 모바일 여부 설정
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

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
	};
};
