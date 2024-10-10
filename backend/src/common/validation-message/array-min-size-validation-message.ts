import { ValidationArguments } from 'class-validator';

export const arrayMinSizeValidationMessage = (args: ValidationArguments) => {
	return `${args.property}가 최소 길이가 ${args.constraints[0]}이어야 합니다.`;
};
