import { ValidationArguments } from 'class-validator';

export const maxLengthValidationMessage = (args: ValidationArguments) => {
	return `${args.property}은 최대 글자는 ${args.constraints[0]} 입니다.`;
};
