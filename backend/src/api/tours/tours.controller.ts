import { AccessTokenGuard } from '@/common/guards/accessToken.guard';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor';
import { HttpService } from '@nestjs/axios';
import {
	Controller,
	Get,
	Query,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { ToursService } from './tours.service';

@UseInterceptors(LoggingInterceptor, TimeoutInterceptor)
//@UseGuards(AccessTokenGuard)
@ApiTags('tours')
@Controller('tours')
export class ToursController {
	constructor(
		private readonly httpService: HttpService,
		private readonly toursService: ToursService,
	) {}

	@Get()
	async findAll() {
		return await this.toursService.findAll();
	}

	@Get('/area')
	async getHttpTourApiAreaCodes(
		@Query('numOfRows') numOfRows: number,
		@Query('pageNo') pageNo: number,
		@Query('areaCode') areaCode: number,
	) {
		return await this.toursService.getHttpTourApiAreaCodes({
			numOfRows,
			pageNo,
			areaCode,
		});
	}

	@Get('/service-categories')
	async getHttpTourApiServiceCategories(
		@Query('numOfRows') numOfRows: number,
		@Query('pageNo') pageNo: number,
	) {
		return await this.toursService.getHttpTourApiServiceCategories({
			numOfRows,
			pageNo,
		});
	}
}
