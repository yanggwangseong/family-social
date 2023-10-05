import { Module } from '@nestjs/common';
import { FeedsController } from './feeds.controller';
import { FeedsService } from './feeds.service';
import { FeedsRepository } from '@/models/repositories/feeds.repository';

@Module({
	imports: [],
	controllers: [FeedsController],
	providers: [FeedsService, FeedsRepository],
	exports: [],
})
export class FeedsModule {}
