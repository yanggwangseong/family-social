import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestEntity } from '@/models/entities/test.entity';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
	imports: [TypeOrmModule.forFeature([TestEntity])],
	controllers: [UsersController],
	providers: [UsersService],
})
export class UsersModule {}
