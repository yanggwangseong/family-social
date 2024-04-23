import React, { FC, PropsWithChildren } from 'react';
import cn from 'classnames';
import { CustomButtonType } from './custom-button.interface';
import styles from './CustomButton.module.scss';
import { motion } from 'framer-motion';
import { INLINEBUTTONGESTURE } from '@/utils/animation/gestures';

const CustomButton: FC<PropsWithChildren<CustomButtonType>> = ({
	children,
	className,
	disabled,
	shadowNone,
	...rest
}) => {
	return (
		<motion.div className="w-full" {...INLINEBUTTONGESTURE}>
			<button
				className={cn(styles.button, className, {
					[styles.disabled]: disabled,
					[styles.shadowNone]: shadowNone,
				})}
				{...rest}
			>
				{children}
			</button>
		</motion.div>
	);
};

export default CustomButton;
