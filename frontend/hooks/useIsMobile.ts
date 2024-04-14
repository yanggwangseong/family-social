import { useEffect, useState } from 'react';

export const useIsMobile = () => {
	const [isMobile, setIsMobile] = useState(false);

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

	return {
		isMobile,
	};
};
