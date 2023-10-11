export const NUM_OF_ENTITIES = 3;

export const getOffset = (page: number) => {
	const skip: number = page * NUM_OF_ENTITIES;
	const take: number = NUM_OF_ENTITIES;

	return {
		skip,
		take,
	};
};
