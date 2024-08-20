import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

export default new DataSource({
	type: 'postgres',
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	synchronize: false,
	entities: ['src/**/*.entity.ts'],
	migrations: ['src/database/migrations/*.ts'],
	migrationsTableName: 'migrations',
});
