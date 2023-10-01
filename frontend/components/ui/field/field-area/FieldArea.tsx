import React, { forwardRef } from 'react';
import cn from 'classnames';
import styles from './FieldArea.module.scss';
import { FieldAreaType } from './field-area.interface';

const FieldWithTextarea = forwardRef<HTMLTextAreaElement, FieldAreaType>(
	({ fieldClass = 'area', labelText, error, ...rest }, ref) => {
		return (
			<>
				<div className={cn(styles[fieldClass])}>
					{labelText && <label>{labelText}</label>}
					<textarea ref={ref} {...rest} />
				</div>
				{error && <div className={styles.error}>{error.message}</div>}
			</>
		);
	},
);

FieldWithTextarea.displayName = 'FieldWithTextarea';

export default FieldWithTextarea;
