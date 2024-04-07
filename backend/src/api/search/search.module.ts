import { Module } from '@nestjs/common';

import { SearchController } from './search.controller';
import { MembersModule } from '../members/members.module';

@Module({
	imports: [MembersModule],
	controllers: [SearchController],
	providers: [],
	exports: [],
})
export class SearchModule {}
