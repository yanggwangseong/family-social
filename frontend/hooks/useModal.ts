import { useEffect, useState } from 'react';

export const useModal = (modalWrapperRef: React.RefObject<HTMLDivElement>) => {
	const [isShowing, setIsShowing] = useState<boolean>(false);

	const handleToggleModal = () => {
		setIsShowing(!isShowing);
	};

	useEffect(() => {
		// 바깥 영역 클릭 시 모달 닫기
		const handleClickOutside = (e: MouseEvent) => {
			if (
				modalWrapperRef.current &&
				!modalWrapperRef.current.contains(e.target as Node)
			) {
				setIsShowing(false);
			}
		};

		// 이벤트 리스너 등록
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			// 컴포넌트가 언마운트될 때 이벤트 리스너 해제
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return {
		isShowing,
		handleToggleModal,
	};
};
