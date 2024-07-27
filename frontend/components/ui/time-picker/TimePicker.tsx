import React, { FC } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './TimePicker.module.scss';
import { Control, Path, RegisterOptions, useController } from 'react-hook-form';

interface Props<T extends Record<string, any>> {
	control: Control<T>;
	name: Path<T>;
	validationOptions?: Omit<
		RegisterOptions<T, Path<T>>,
		'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
	>;
}

const TimePicker = <T extends Record<string, any>>(props: Props<T>) => {
	const { control, name, validationOptions } = props;

	const {
		field,
		fieldState: { invalid, isTouched, isDirty, error },
		formState: { touchedFields, dirtyFields },
	} = useController({
		name,
		control,
		rules: { ...validationOptions },
	});

	return (
		<DatePicker
			className={styles.datePicker}
			locale={ko}
			showTimeSelect
			showTimeSelectOnly
			timeIntervals={30}
			timeCaption="Time"
			dateFormat="HH:mm"
			selected={field.value}
			onChange={field.onChange}
			timeClassName={d => {
				return styles.unselectedDay;
			}}
		></DatePicker>
	);
};

export default TimePicker;
