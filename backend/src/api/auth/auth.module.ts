import { Module } from '@nestjs/common';
import { MembersModule } from '../members/members.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberEntity } from '@/entities/member.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AccessTokenStrategy } from '@/common/strategies/accessToken.strategy';
import { RefreshTokenStrategy } from '@/common/strategies/refreshToken.strategy';

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
})
export class AuthModule {}
