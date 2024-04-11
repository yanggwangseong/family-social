import { ERROR_BOOLEAN_PIPE_MESSAGE } from '@/constants/business-error';

import { BadRequestServiceException } from '../exception/service.exception';

export const parseBooleanPipeMessage = () => {
	throw BadRequestServiceException(ERROR_BOOLEAN_PIPE_MESSAGE);
};
