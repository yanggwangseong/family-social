import { MotionProps } from 'framer-motion';

export const BUTTONGESTURE: MotionProps = {
	transition: { type: 'spring', stiffness: 400, damping: 10 },
	whileHover: { scale: 1.1 },
};

export const INLINEBUTTONGESTURE: MotionProps = {
	transition: { type: 'spring', stiffness: 400, damping: 10 },
	whileHover: { scale: 1.03 },
};
