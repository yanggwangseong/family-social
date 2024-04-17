import { MotionProps } from 'framer-motion';

export const easeOutAnimation = (index: number): MotionProps => {
	return {
		initial: { opacity: 0, y: 20 }, // 초기 상태
		animate: { opacity: 1, y: 0 }, // 애니메이션 후 상태
		exit: { opacity: 0, y: -20 }, // 사라질 때의 상태
		transition: { ease: 'easeOut', duration: 1, delay: index * 0.2 }, // 애니메이션 지속시간과 딜레이 설정
	};
};
