import { Variants } from 'framer-motion';

export const toggleVariant: Variants = {
	open: {
		opacity: 1,
		y: 0,
		transition: { type: 'spring', stiffness: 300, damping: 24 },
	},
	closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

export const toggleWrapperVariant: Variants = {
	open: {
		clipPath: 'inset(0% 0% 0% 0%)',
		transition: {
			type: 'spring',
			bounce: 0,
			duration: 0.7,
			delayChildren: 0.3,
			staggerChildren: 0.05,
		},
	},
	closed: {
		clipPath: 'inset(10% 50% 90% 50%)',
		transition: {
			type: 'spring',
			bounce: 0,
			duration: 0.3,
		},
	},
};
