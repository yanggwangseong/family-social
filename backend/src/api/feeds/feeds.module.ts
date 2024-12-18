import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentsModule } from '@/api/comments/comments.module';
import { MediasModule } from '@/api/medias/medias.module';
import { MentionsModule } from '@/api/mentions/mentions.module';
import { NotificationsModule } from '@/api/notifications/notifications.module';
import { CommentExistsMiddleware } from '@/common/middlewares/comment-exists.middleware';
import { FeedExistsMiddleware } from '@/common/middlewares/feed-exists.middleware';
import { Pagination } from '@/common/strategies/context/pagination';
import { LikesCache } from '@/models/cache/likes-cache';
import { FeedEntity } from '@/models/entities/feed.entity';
import { LikeFeedEntity } from '@/models/entities/like-feed.entity';
import { FeedsRepository } from '@/models/repositories/feeds.repository';
import { LikesFeedRepository } from '@/models/repositories/likes-feed.repository';

import { FeedsController } from './feeds.controller';
import { FeedsService } from './feeds.service';
import { GroupsModule } from '../groups/groups.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([FeedEntity, LikeFeedEntity]),
		MediasModule,
		CommentsModule,
		NotificationsModule,
		MentionsModule,
		GroupsModule,
	],
	controllers: [FeedsController],
	providers: [
		FeedsService,
		FeedsRepository,
		LikesFeedRepository,
		LikesCache,
		Pagination,
	],
	exports: [FeedsService],
})
export class FeedsModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(FeedExistsMiddleware)
			.exclude(
				{ path: 'feeds', method: RequestMethod.GET },
				{ path: 'feeds', method: RequestMethod.POST },
				{ path: 'feeds/test', method: RequestMethod.POST },
				{ path: 'feeds/my-group-feeds', method: RequestMethod.GET },
			)
			.forRoutes(FeedsController);

		consumer.apply(CommentExistsMiddleware).forRoutes(
			{
				path: 'feeds/:feedId/comments/:commentId',
				method: RequestMethod.PUT,
			},
			{
				path: 'feeds/:feedId/comments/:commentId',
				method: RequestMethod.DELETE,
			},
			{
				path: 'feeds/:feedId/comments/:commentId/likes',
				method: RequestMethod.PUT,
			},
		);
	}
}
