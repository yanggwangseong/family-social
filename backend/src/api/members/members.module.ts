import { Module } from '@nestjs/common';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { MembersRepository } from '@/models/repositories/members.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberEntity } from '@/entities/member.entity';

@Module({
	imports: [TypeOrmModule.forFeature([MemberEntity])],
	controllers: [MembersController],
	providers: [MembersService, MembersRepository],
	exports: [MembersService, MembersRepository],
})
export class MembersModule {}
