import {
	ClassSerializerInterceptor,
	MiddlewareConsumer,
	Module,
	NestModule,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@nestjs-modules/ioredis';
import { MailerModule } from '@nestjs-modules/mailer';
import { SentryModule } from '@sentry/nestjs/setup';

import { UsersModule } from '@/api/users/users.module';
import { LoggerMiddleware } from '@/common/middlewares/logger.middleware';
import { TypeOrmModuleOptions } from '@/common/typeorm';

import { AuthModule } from './api/auth/auth.module';
import { ChatsModule } from './api/chats/chats.module';
import { CommentsModule } from './api/comments/comments.module';
import { FamsModule } from './api/fams/fams.module';
import { FeedsModule } from './api/feeds/feeds.module';
import { GroupsModule } from './api/groups/groups.module';
import { InvitationsModule } from './api/invitations/invitations.module';
import { MailsModule } from './api/mails/mails.module';
import { MediasModule } from './api/medias/medias.module';
import { MembersModule } from './api/members/members.module';
import { MentionsModule } from './api/mentions/mentions.module';
import { NotificationsModule } from './api/notifications/notifications.module';
import { SearchModule } from './api/search/search.module';
import { ServerSentEventsModule } from './api/server-sent-events/server-sent-events.module';
import { ToursModule } from './api/tours/tours.module';
import { EmailOptions } from './common/config/emailConfig';
import { RedisOptions } from './common/config/redis-config';
import { ThrottlerBehindProxyGuard } from './common/guards/throttler-behind-proxy.guard';
import {
	ENV_THROTTLER_LIMIT,
	ENV_THROTTLER_TTL,
} from './constants/env-keys.const';
import {
	LIKE_CACHE_TYPE_COMMENT,
	LIKE_CACHE_TYPE_FEED,
} from './constants/string-constants';

@Module({
	imports: [
		SentryModule.forRoot(), // first import!!!
		RedisModule.forRootAsync(RedisOptions),
		MailerModule.forRootAsync(EmailOptions),
		ConfigModule.forRoot({
			envFilePath: [`${__dirname}/../.${process.env.NODE_ENV}.env`],
			isGlobal: true,
			load: [
				() => ({
					LIKE_CACHE_TYPE_FEED: LIKE_CACHE_TYPE_FEED,
					LIKE_CACHE_TYPE_COMMENT: LIKE_CACHE_TYPE_COMMENT,
				}),
			],
		}),
		TypeOrmModule.forRootAsync(TypeOrmModuleOptions),
		UsersModule,
		MembersModule,
		AuthModule,
		GroupsModule,
		FamsModule,
		FeedsModule,
		MediasModule,
		CommentsModule,
		ToursModule,
		ChatsModule,
		MailsModule,
		SearchModule,
		NotificationsModule,
		ServerSentEventsModule,
		MentionsModule,
		InvitationsModule,
		ThrottlerModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (config: ConfigService) => [
				{
					ttl: config.get<number>(ENV_THROTTLER_TTL, { infer: true }),
					limit: config.get<number>(ENV_THROTTLER_LIMIT, { infer: true }),
				},
			],
		}),
	],
	controllers: [],
	providers: [
		{
			provide: APP_GUARD,
			useClass: ThrottlerBehindProxyGuard,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: ClassSerializerInterceptor,
		},
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
