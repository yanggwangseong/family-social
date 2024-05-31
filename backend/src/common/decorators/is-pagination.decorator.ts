import { SetMetadata } from '@nestjs/common';

import { PAGINATION_KEY, PaginationEnum } from '@/constants/pagination.const';

export const IsPagination = (pagination: PaginationEnum) =>
	SetMetadata(PAGINATION_KEY, pagination);
