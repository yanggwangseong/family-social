import { forwardRef } from 'react';
import cn from 'classnames';
import styles from './Field.module.scss';
import { FieldType } from './field.interface';

const Field = forwardRef<HTMLInputElement, FieldType>(
	({ error, type = 'text', style, Icon, ...rest }, ref) => {
		return (
			<>
				<div
					className={cn(styles.input, {
						[styles.withIcon]: !!Icon,
					})}
					style={style}
				>
					{Icon && (
						<div className={styles.icon}>
							<Icon />
						</div>
					)}
					<input ref={ref} type={type} {...rest} />
				</div>
				{error && <div className={styles.error}>{error.message}</div>}
			</>
		);
	},
);

Field.displayName = 'Field';

export default Field;
