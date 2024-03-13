import { ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

import { ServiceHttpExceptionFilter } from '@/common/filter/service-http-exception.filter';
import { SuccessInterceptor } from '@/common/interceptors/sucess.interceptor';

import { AppModule } from './app.module';
import { BadRequestServiceException } from './common/exception/service.exception';
import { CustomValidationPipe } from './common/pipes/custom-validation.pipe';

const getSwaggerOptions = () => ({
	swaggerOptions: {
		persistAuthorization: true, //웹 페이지를 새로고침을 해도 Token 값 유지
	},
});

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.set('trust proxy', true);

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
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
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

	// exception
	app.useGlobalFilters(new ServiceHttpExceptionFilter());

	// sucess interceptor
	app.useGlobalInterceptors(new SuccessInterceptor());

	// cors
	app.enableCors(options);

	// cookie parser
	app.use(cookieParser());

	// production 나중에 적용
	//process.env.NODE_ENV === 'production' && app.use(helmet());

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
