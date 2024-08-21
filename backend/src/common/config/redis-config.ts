import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModuleOptions } from '@nestjs-modules/ioredis';

import {
	ENV_REDIS_HOST,
	ENV_REDIS_PORT,
	ENV_REDIS_PROTOCOL,
	ENV_REDIS_TYPE,
} from '@/constants/env-keys.const';

export const RedisOptions = {
	imports: [ConfigModule],
	inject: [ConfigService],

	useFactory: async (
		configService: ConfigService,
	): Promise<RedisModuleOptions> => {
		const options = {
			type: configService.get(ENV_REDIS_TYPE),
			url: `${configService.get(ENV_REDIS_PROTOCOL)}${configService.get(
				ENV_REDIS_HOST,
			)}:${configService.get(ENV_REDIS_PORT)}`,
		};

		return options;
	},
};
