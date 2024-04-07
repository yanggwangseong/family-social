import { Module } from '@nestjs/common';

import { SearchController } from './search.controller';
import { MembersModule } from '../members/members.module';
import { ToursModule } from '../tours/tours.module';

@Module({
	imports: [MembersModule, ToursModule],
	controllers: [SearchController],
	providers: [],
	exports: [],
})
export class SearchModule {}
