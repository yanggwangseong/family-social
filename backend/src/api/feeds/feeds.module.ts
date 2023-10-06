import { Module } from '@nestjs/common';
import { FeedsController } from './feeds.controller';
import { FeedsService } from './feeds.service';
import { FeedsRepository } from '@/models/repositories/feeds.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedEntity } from '@/models/entities/feed.entity';
import { MediasModule } from '../medias/medias.module';

@Module({
	imports: [TypeOrmModule.forFeature([FeedEntity]), MediasModule],
	controllers: [FeedsController],
	providers: [FeedsService, FeedsRepository],
	exports: [],
})
export class FeedsModule {}
