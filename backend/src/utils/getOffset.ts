import { IPaginationArgs } from '@/types';

export const NUM_OF_ENTITIES = 3 as const;

export const getOffset = ({ page, limit }: IPaginationArgs) => {
	const take: number = limit ?? NUM_OF_ENTITIES;
	const skip: number = page > 1 ? take * (page - 1) : 0;

	return {
		skip,
		take,
	};
};
