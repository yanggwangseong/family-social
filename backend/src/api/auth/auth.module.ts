import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccessTokenStrategy } from '@/common/strategies/accessToken.strategy';
import { RefreshTokenStrategy } from '@/common/strategies/refreshToken.strategy';
import { MemberEntity } from '@/models/entities/member.entity';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MembersModule } from '../members/members.module';

@Module({
	imports: [
		JwtModule.registerAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
				signOptions: {
					expiresIn: `${configService.get('JWT_ACCESS_TOKEN_EXPIRATION')}s`,
				},
			}),
		}),
		MembersModule,
		TypeOrmModule.forFeature([MemberEntity]),
	],
	controllers: [AuthController],
	providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
	exports: [AuthService],
})
export class AuthModule {}
