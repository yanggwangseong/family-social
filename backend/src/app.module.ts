import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@/common/typeorm';
import { UsersModule } from '@/api/users/users.module';
import { LoggerMiddleware } from '@/common/middlewares/logger.middleware';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailOptions } from './common/config/emailConfig';
import { MembersModule } from './api/members/members.module';
import { AuthModule } from './api/auth/auth.module';
import { GroupsModule } from './api/groups/groups.module';

@Module({
	imports: [
		MailerModule.forRootAsync(EmailOptions),
		ConfigModule.forRoot({
			envFilePath: [`${__dirname}/../.${process.env.NODE_ENV}.env`],
			isGlobal: true,
		}),
		TypeOrmModule.forRootAsync(TypeOrmModuleOptions),
		UsersModule,
		MembersModule,
		AuthModule,
		GroupsModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
