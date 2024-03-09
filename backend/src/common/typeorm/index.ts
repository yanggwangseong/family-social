import { ConfigModule, ConfigService } from '@nestjs/config';

import {
	ENV_DB_DATABASE,
	ENV_DB_HOST,
	ENV_DB_PASSWORD,
	ENV_DB_PORT,
	ENV_DB_SYNCHRONIZE,
	ENV_DB_TYPE,
	ENV_DB_USERNAME,
} from '@/constants/env-keys.const';

export const TypeOrmModuleOptions = {
	imports: [ConfigModule],
	inject: [ConfigService],
	useFactory: async (configService: ConfigService) => {
		const NODE_ENV = configService.get('NODE_ENV');

		const option = {
			type: configService.get(ENV_DB_TYPE),
			host: configService.get(ENV_DB_HOST),
			port: Number(configService.get<number>(ENV_DB_PORT)),
			username: configService.get(ENV_DB_USERNAME),
			database: configService.get(ENV_DB_DATABASE),
			password: configService.get(ENV_DB_PASSWORD),
			entities: [__dirname + '/../../**/*.entity.{js,ts}'],
			synchronize: configService.get<boolean>(ENV_DB_SYNCHRONIZE),
			ssl: NODE_ENV === 'development' ? '' : { rejectUnauthorized: false },
			...(NODE_ENV === 'development'
				? { retryAttempts: 10, logging: true }
				: { logging: false }),
		};

		return option;
	},
};
// export const typeORMConfig: TypeOrmModuleOptions = {
// 	type: 'postgres',
// 	host: process.env.DB_HOST,
// 	port: 5432,
// 	username: process.env.DB_USERNAME,
// 	password: process.env.DB_PASSWORD,
// 	database: process.env.DB_DATABASE,
// 	entities: [__dirname + '/../../**/*.entity.{js,ts}'],
// 	synchronize: true,
// 	ssl: {
// 		rejectUnauthorized: false,
// 	},
// };
