import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MemberEntity } from '@/models/entities/member.entity';
import { MembersRepository } from '@/models/repositories/members.repository';

import { MembersController } from './members.controller';
import { MembersService } from './members.service';

@Module({
	imports: [TypeOrmModule.forFeature([MemberEntity])],
	controllers: [MembersController],
	providers: [MembersService, MembersRepository],
	exports: [MembersService, MembersRepository],
})
export class MembersModule {}
