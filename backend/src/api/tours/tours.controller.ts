import { AccessTokenGuard } from '@/common/guards/accessToken.guard';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor';
import { HttpService } from '@nestjs/axios';
import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@UseInterceptors(LoggingInterceptor, TimeoutInterceptor)
//@UseGuards(AccessTokenGuard)
@ApiTags('tours')
@Controller('tours')
export class ToursController {
	constructor(private readonly httpService: HttpService) {}

	@Get()
	async findAll() {
		const { data } = await firstValueFrom(
			this.httpService.get('http://apis.data.go.kr/B551011/KorService1').pipe(
				catchError((error: AxiosError) => {
					throw 'An error happened!';
				}),
			),
		);

		return data;
	}
}
