import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from '@/entities/group.entity';
import { GroupsRepository } from '@/models/repositories/groups.repository';
import { FamsRepository } from '@/models/repositories/fams.repository';
import { FamEntity } from '@/entities/fam.entity';
import { FamsModule } from '../fams/fams.module';
import { MembersModule } from '../members/members.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([GroupEntity, FamEntity]),
		FamsModule,
		MembersModule,
	],
	controllers: [GroupsController],
	providers: [GroupsService, GroupsRepository, FamsRepository],
	exports: [],
})
export class GroupsModule {}
