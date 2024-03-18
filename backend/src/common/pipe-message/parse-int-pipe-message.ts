import { ERROR_INT_PIPE_MESSAGE } from '@/constants/business-error';

import { BadRequestServiceException } from '../exception/service.exception';

export const parseIntPipeMessage = (property: string) => {
	throw BadRequestServiceException(`${property} ${ERROR_INT_PIPE_MESSAGE}`);
};
