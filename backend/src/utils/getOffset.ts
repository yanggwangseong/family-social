export const NUM_OF_ENTITIES = 3;

export const getOffset = (page: number) => {
	const take: number = NUM_OF_ENTITIES;
	const skip: number = page > 1 ? take * (page - 1) : 0;

	return {
		skip,
		take,
	};
};
