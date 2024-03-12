import { ValidationArguments } from 'class-validator';

export const booleanValidationMessage = (args: ValidationArguments) => {
	return `${args.property}에 Boolean을 입력 해주세요!`;
};
