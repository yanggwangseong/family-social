import { toggleVariant } from '@/utils/animation/toggle-variant';
import { motion } from 'framer-motion';
import React, { FC, PropsWithChildren } from 'react';

const LayerModalVariantWrapper: FC<
	PropsWithChildren<{ className?: string }>
> = ({ children, className }) => {
	return (
		<motion.div variants={toggleVariant} className={className}>
			{children}
		</motion.div>
	);
};

export default LayerModalVariantWrapper;
