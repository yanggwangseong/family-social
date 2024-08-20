import path from 'path';

import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

import {
	ENV_DB_DATABASE,
	ENV_DB_PASSWORD,
	ENV_DB_PORT,
	ENV_DB_SOURCE_HOST,
	ENV_DB_USERNAME,
} from '@/constants/env-keys.const';

dotenv.config({
	path: path.resolve(
		process.env.NODE_ENV === 'production'
			? '.production.env'
			: process.env.NODE_ENV === 'stage'
			? '.stage.env'
			: '.development.env',
	),
});

if (process.env.NODE_ENV === 'development')
	process.env.DB_HOST = process.env[ENV_DB_SOURCE_HOST];

export default new DataSource({
	type: 'postgres',
	host: process.env.ENV_DB_HOST,
	port: Number(process.env[ENV_DB_PORT]),
	username: process.env[ENV_DB_USERNAME],
	password: process.env[ENV_DB_PASSWORD],
	database: process.env[ENV_DB_DATABASE],
	synchronize: false,
	entities: ['src/**/*.entity.ts'],
	migrations: ['src/database/migrations/*.ts'],
	migrationsTableName: 'migrations',
});
