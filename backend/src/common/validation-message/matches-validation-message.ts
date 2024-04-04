import { ValidationArguments } from 'class-validator';

export const matchesValidationMessage = (args: ValidationArguments) => {
	return `${args.property}의 형식이 잘못 되었습니다!`;
};
