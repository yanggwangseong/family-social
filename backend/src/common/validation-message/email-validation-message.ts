import { ValidationArguments } from 'class-validator';

export const emailValidationMessage = (args: ValidationArguments) => {
	return `${args.property}의 email 형식이 잘못 되었습니다`;
};
