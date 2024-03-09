import { ValidationArguments } from 'class-validator';

export const uuidValidationMessage = (args: ValidationArguments) => {
	return `${args.property}에 UUID를 입력 해주세요!`;
};
