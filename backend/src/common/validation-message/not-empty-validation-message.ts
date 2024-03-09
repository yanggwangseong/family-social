import { ValidationArguments } from 'class-validator';

export const notEmptyValidationMessage = (args: ValidationArguments) => {
	return `${args.property}에 값이 없습니다!`;
};
