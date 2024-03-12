import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentExistsMiddleware } from '@/common/middlewares/comment-exists.middleware';
import { FeedExistsMiddleware } from '@/common/middlewares/feed-exists.middleware';
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
export class FeedsModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(FeedExistsMiddleware)
			.exclude(
				{ path: 'feeds', method: RequestMethod.GET },
				{ path: 'feeds', method: RequestMethod.POST },
				{ path: 'test', method: RequestMethod.POST },
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
