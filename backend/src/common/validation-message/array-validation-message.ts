import { ValidationArguments } from 'class-validator';

export const arrayValidationMessage = (args: ValidationArguments) => {
	return `${args.property}가 빈 배열입니다!`;
};
