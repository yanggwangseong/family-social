import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SuccessInterceptor } from '@/common/interceptors/sucess.interceptor';
import { ServiceHttpExceptionFilter } from '@/common/filter/service-http-exception.filter';

const getSwaggerOptions = () => ({
	swaggerOptions: {
		persistAuthorization: true, //웹 페이지를 새로고침을 해도 Token 값 유지
	},
});

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const options = {
		origin: true,
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		preflightContinue: false,
		credentials: true,
		allowedHeaders: 'Content-Type, Accept, Authorization',
	};

	// set global prefix
	app.setGlobalPrefix('api');

	// global pipes
	app.useGlobalPipes(new ValidationPipe({ transform: true }));

	// exception
	app.useGlobalFilters(new ServiceHttpExceptionFilter());

	// sucess interceptor
	app.useGlobalInterceptors(new SuccessInterceptor());

	// cors
	app.enableCors(options);

	// cookie parser
	app.use(cookieParser());

	// swagger
	const config = new DocumentBuilder()
		.setTitle('fam API')
		.setDescription('fam 서비스를 위한 API 문서')
		.setVersion('1.0.0')
		.addBearerAuth(
			{
				type: 'http',
				scheme: 'bearer',
				name: 'JWT',
				in: 'header',
			},
			'accessToken',
		)
		.addSecurityRequirements('accessToken')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api/v1/swagger', app, document, getSwaggerOptions());

	await app.listen(5001);
}
bootstrap();
