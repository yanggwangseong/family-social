import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from '@/entities/group.entity';
import { GroupsRepository } from './groups.repository';
import { MemberGroupEntity } from '@/entities/member-group.entity';
import { FamsRepository } from '../fams/fams.repository';
import { FamEntity } from '@/entities/fam.entity';

@Module({
	imports: [TypeOrmModule.forFeature([GroupEntity, FamEntity])],
	controllers: [GroupsController],
	providers: [GroupsService, GroupsRepository, FamsRepository],
	exports: [],
})
export class GroupsModule {}
