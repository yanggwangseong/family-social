import './common/sentry/instrument';

import path from 'path';

import { ValidationError, ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { IncomingWebhook } from '@slack/webhook';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import helmet from 'helmet';

import { ServiceHttpExceptionFilter } from '@/common/filter/service-http-exception.filter';
import { SuccessInterceptor } from '@/common/interceptors/sucess.interceptor';
import { winstonLogger } from '@/common/logger/winston';

import { AppModule } from './app.module';
import { BadRequestServiceException } from './common/exception/service.exception';
import { AllExceptionFilter } from './common/filter/all-exception.filter';
import { CustomValidationPipe } from './common/pipes/custom-validation.pipe';
import {
	ENV_APPLICATION_PORT,
	ENV_CLIENT_SOCKET_URL,
	ENV_GLOBAL_PREFIX,
	ENV_SECRET_COOKIE_KEY,
	ENV_SLACK_URL,
} from './constants/env-keys.const';

dotenv.config({
	path: path.resolve(
		process.env.NODE_ENV === 'production'
			? '.production.env'
			: process.env.NODE_ENV === 'stage'
			? '.stage.env'
			: '.development.env',
	),
});

const getSwaggerOptions = () => ({
	swaggerOptions: {
		persistAuthorization: true, //웹 페이지를 새로고침을 해도 Token 값 유지
	},
});

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.set('trust proxy', true);

	const options: CorsOptions = {
		origin:
			process.env.NODE_ENV === 'production'
				? process.env[ENV_CLIENT_SOCKET_URL]
				: true,
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		preflightContinue: false,
		credentials: true,
		allowedHeaders: 'Content-Type, Accept, Authorization',
	};

	// use log winston
	app.useLogger(winstonLogger);

	// set global prefix
	app.setGlobalPrefix(String(process.env[ENV_GLOBAL_PREFIX]));

	// global pipes
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			transformOptions: {
				enableImplicitConversion: false,
			},
			stopAtFirstError: true,
			whitelist: true,
			forbidNonWhitelisted: true,

			exceptionFactory: (validationErrors: ValidationError[] = []) => {
				//const { constraints } = validationErrors[0];

				const validationInstance = new CustomValidationPipe();

				const errors =
					validationInstance._flattenValidationErrors(validationErrors);

				return BadRequestServiceException(errors.join(','));

				//if (!constraints) return validationErrors;

				//const [firstKey] = Object.keys(constraints);

				//return BadRequestServiceException(constraints[firstKey]);
			},
		}),
	);

	const webhook = new IncomingWebhook(process.env[ENV_SLACK_URL]!);

	const httpAdapterHost = app.get(HttpAdapterHost);

	// exception
	app.useGlobalFilters(
		new AllExceptionFilter(httpAdapterHost, webhook),
		new ServiceHttpExceptionFilter(),
	);

	// sucess interceptor
	app.useGlobalInterceptors(new SuccessInterceptor());

	// cors
	app.enableCors(options);

	// cookie parser
	app.use(cookieParser(process.env[ENV_SECRET_COOKIE_KEY]));

	// production 나중에 적용
	process.env.NODE_ENV === 'production' && app.use(helmet());

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

	await app.listen(Number(process.env[ENV_APPLICATION_PORT]));
}
bootstrap();
