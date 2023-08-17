import { Module } from '@nestjs/common';
import { MembersModule } from '../members/members.module';
import { AuthController } from './auth.controller';

@Module({
	imports: [MembersModule],
	controllers: [AuthController],
	providers: [],
})
export class AuthModule {}
