import { forwardRef } from 'react';
import cn from 'classnames';
import styles from './Field.module.scss';
import { FieldType } from './field.interface';
import CustomButton from '../button/custom-button/CustomButton';

const Field = forwardRef<HTMLInputElement, FieldType>(
	(
		{
			fieldClass = 'input',
			labelText,
			error,
			type = 'text',
			style,
			Icon,
			...rest
		},
		ref,
	) => {
		return (
			<>
				<div
					className={cn(styles[fieldClass], {
						[styles.withIcon]: !!Icon,
					})}
					style={style}
				>
					{Icon && (
						<div className={styles.icon}>
							<Icon />
						</div>
					)}

					{labelText && <label>{labelText}</label>}
					<input ref={ref} type={type} {...rest} />
				</div>
				{error && <div className={styles.error}>{error.message}</div>}
			</>
		);
	},
);

Field.displayName = 'Field';

export default Field;
