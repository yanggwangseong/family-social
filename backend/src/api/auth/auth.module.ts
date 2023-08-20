import { Module } from '@nestjs/common';
import { MembersModule } from '../members/members.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberEntity } from '@/entities/member.entity';

@Module({
	imports: [MembersModule, TypeOrmModule.forFeature([MemberEntity])],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
