import { TextareaHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

export interface FieldAreaProps {
	error?: FieldError | undefined;
	fieldClass?: string;
	labelText?: string;
}

type TypeAreaPropsField = TextareaHTMLAttributes<HTMLTextAreaElement> &
	FieldAreaProps;

export interface FieldAreaType extends TypeAreaPropsField {}
