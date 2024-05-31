import { ValidationArguments } from 'class-validator';

export const isInValidationMessage = (args: ValidationArguments) => {
	return `${args.property}의 값이 올바르지 않습니다 ${args.constraints
		.flat(Infinity)
		.join(',')}`;
};
