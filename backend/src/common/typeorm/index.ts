import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// export const TypeOrmModuleOptions = {
// 	imports: [ConfigModule],
// 	inject: [ConfigService],
// 	useFactory: async (configService: ConfigService) => {
// 		const NODE_ENV = configService.get('NODE_ENV');

// 		const option = {
// 			type: configService.get('DB_TYPE'),
// 			host: configService.get('DB_HOST'),
// 			port: Number(configService.get<number>('DB_PORT')),
// 			username: configService.get('DB_USERNAME'),
// 			database: configService.get('DB_DATABASE'),
// 			password: configService.get('DB_PASSWORD'),
// 			entities: [__dirname + '/../../**/*.entity.{js,ts}'],
// 			synchronize: NODE_ENV === 'development' ? true : false,
// 			...(NODE_ENV === 'development'
// 				? { retryAttempts: 10, logging: true }
// 				: { logging: false }),
// 		};

// 		return option;
// 	},
// };
export const typeORMConfig: TypeOrmModuleOptions = {
	type: 'postgres',
	host: process.env.DB_HOST,
	port: 5432,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	entities: [__dirname + '/../../**/*.entity.{js,ts}'],
	synchronize: true,
};
