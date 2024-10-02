import { ValidationArguments } from 'class-validator';

export const arrayMaxSizeValidationMessage = (args: ValidationArguments) => {
	return `${args.property}가 최대 길이가 ${args.constraints[0]}이어야 합니다.`;
};
