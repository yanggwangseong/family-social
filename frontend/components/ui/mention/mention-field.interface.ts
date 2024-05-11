import { Control, Path, RegisterOptions } from 'react-hook-form';

export interface MentionFieldProps<T extends Record<string, any>> {
	control: Control<T>;
	fieldName: Path<T>;
	validationOptions?: Omit<
		RegisterOptions<T, Path<T>>,
		'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
	>;
	placeholderText: string;
}
