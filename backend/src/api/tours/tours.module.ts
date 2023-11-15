import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ToursController } from './tours.controller';

@Module({
	imports: [HttpModule],
	controllers: [ToursController],
	providers: [],
	exports: [],
})
export class ToursModule {}
