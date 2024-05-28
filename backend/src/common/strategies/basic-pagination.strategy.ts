import { Repository, FindManyOptions, ObjectLiteral } from 'typeorm';

import { DefaultPaginationReqDto } from '@/models/dto/pagination/req/default-pagination-req.dto';

import { PaginationStrategy } from './context/pagination';

export class BasicPaginationStrategy<T extends ObjectLiteral>
	implements PaginationStrategy<T>
{
	async paginate(
		dto: DefaultPaginationReqDto,
		repository: Repository<T>,
		overrideFindOptions: FindManyOptions<T> = {},
	) {
		const [data, count] = await repository.findAndCount({
			...overrideFindOptions,
		});

		return {
			data,
			count,
		};
	}
}
