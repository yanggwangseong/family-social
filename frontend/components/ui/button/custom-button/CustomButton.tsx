import React, { FC, PropsWithChildren } from 'react';
import cn from 'classnames';
import { CustomButtonType } from './custom-button.interface';
import styles from './CustomButton.module.scss';

const CustomButton: FC<PropsWithChildren<CustomButtonType>> = ({
	children,
	className,
	disabled,
	...rest
}) => {
	return (
		<button
			className={cn(styles.button, className, {
				[styles.disabled]: disabled,
			})}
			{...rest}
		>
			{children}
		</button>
	);
};

export default CustomButton;
