import { Module } from '@nestjs/common';
import { FeedsController } from './feeds.controller';
import { FeedsService } from './feeds.service';
import { FeedsRepository } from '@/models/repositories/feeds.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedEntity } from '@/models/entities/feed.entity';
import { MediasModule } from '../medias/medias.module';
import { LikeFeedEntity } from '@/models/entities/fam-like-feed.entity';
import { LikesFeedRepository } from '@/models/repositories/likes-feed.repository';

@Module({
	imports: [
		TypeOrmModule.forFeature([FeedEntity, LikeFeedEntity]),
		MediasModule,
	],
	controllers: [FeedsController],
	providers: [FeedsService, FeedsRepository, LikesFeedRepository],
	exports: [],
})
export class FeedsModule {}
