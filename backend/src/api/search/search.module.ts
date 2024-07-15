import { Module } from '@nestjs/common';

import { Pagination } from '@/common/strategies/context/pagination';

import { SearchController } from './search.controller';
import { MembersModule } from '../members/members.module';
import { ToursModule } from '../tours/tours.module';

@Module({
	imports: [MembersModule, ToursModule],
	controllers: [SearchController],
	providers: [Pagination],
	exports: [],
})
export class SearchModule {}
