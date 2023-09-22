import { InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';
import { IconType } from 'react-icons';

export interface FieldProps {
	error?: FieldError | undefined;
	Icon?: IconType;
	fieldClass?: string;
	labelText?: string;
}

type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & FieldProps;

export interface FieldType extends TypeInputPropsField {}
