import { ERROR_UUID_PIPE_MESSAGE } from '@/constants/business-error';

import { BadRequestServiceException } from '../exception/service.exception';

export const parseUUIDPipeMessage = () => {
	throw BadRequestServiceException(ERROR_UUID_PIPE_MESSAGE);
};
