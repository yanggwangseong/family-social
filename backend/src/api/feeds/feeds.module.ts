import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FeedEntity } from '@/models/entities/feed.entity';
import { LikeFeedEntity } from '@/models/entities/like-feed.entity';
import { FeedsRepository } from '@/models/repositories/feeds.repository';
import { LikesFeedRepository } from '@/models/repositories/likes-feed.repository';

import { FeedsController } from './feeds.controller';
import { FeedsService } from './feeds.service';
import { CommentsModule } from '../comments/comments.module';
import { MediasModule } from '../medias/medias.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([FeedEntity, LikeFeedEntity]),
		MediasModule,
		CommentsModule,
	],
	controllers: [FeedsController],
	providers: [FeedsService, FeedsRepository, LikesFeedRepository],
	exports: [],
})
export class FeedsModule {}
