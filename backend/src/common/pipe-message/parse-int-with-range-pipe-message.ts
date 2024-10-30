import { BadRequestServiceException } from '../exception/service.exception';

export const parseIntWithRangePipeMessage = (
	property: string,
	min: number,
	max: number,
) => {
	throw BadRequestServiceException(
		`${property} 길이는 ${min} ~ ${max} 입니다.`,
	);
};
