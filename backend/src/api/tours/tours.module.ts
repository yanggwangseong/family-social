import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ToursController } from './tours.controller';
import { ToursService } from './tours.service';

@Module({
	imports: [HttpModule],
	controllers: [ToursController],
	providers: [ToursService],
	exports: [],
})
export class ToursModule {}
