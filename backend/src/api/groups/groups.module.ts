import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from '@/entities/group.entity';
import { GroupsRepository } from './groups.repository';
import { MemberGroupEntity } from '@/entities/member-group.entity';
import { MemberGroupRepository } from './member-group.repository';

@Module({
	imports: [TypeOrmModule.forFeature([GroupEntity, MemberGroupEntity])],
	controllers: [GroupsController],
	providers: [GroupsService, GroupsRepository, MemberGroupRepository],
	exports: [],
})
export class GroupsModule {}
