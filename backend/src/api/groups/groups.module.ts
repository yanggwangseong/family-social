import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from '@/entities/group.entity';
import { GroupsRepository } from './groups.repository';

@Module({
	imports: [TypeOrmModule.forFeature([GroupEntity])],
	controllers: [GroupsController],
	providers: [GroupsService, GroupsRepository],
	exports: [],
})
export class GroupsModule {}
