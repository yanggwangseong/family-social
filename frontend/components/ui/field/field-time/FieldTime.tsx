import React from 'react';
import { Control, Path, RegisterOptions, useController } from 'react-hook-form';
import Field from '../Field';

interface Props<T extends Record<string, any>> {
	control: Control<T>;
	name: Path<T>;
	labelText?: string;
	validationOptions?: Omit<
		RegisterOptions<T, Path<T>>,
		'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
	>;
}

const FieldTime = <T extends Record<string, any>>(props: Props<T>) => {
	const { control, name, validationOptions, labelText } = props;

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
		<Field
			fieldClass={'inline_input'}
			labelText={labelText}
			onChange={field.onChange}
			name={field.name}
			value={field.value}
			className="w-full  md:text-base text-sm"
			type="time"
			error={error && error}
		/>
	);
};

export default FieldTime;
