import { WinstonModule, utilities } from 'nest-winston';
import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';

const dailyOption = (level: string) => {
	return {
		level,
		datePattern: 'YYYY-MM-DD',
		dirname: `./logs/${level}`,
		filename: `%DATE%.${level}.log`,
		maxFiles: 30,
		zippedArchive: true,
		format: winston.format.combine(
			winston.format.timestamp(),
			utilities.format.nestLike(process.env.NODE_ENV, {
				colors: false,
				prettyPrint: true,
			}),
		),
	};
};

export const winstonLogger = WinstonModule.createLogger({
	transports: [
		new winston.transports.Console({
			level: process.env.NODE_ENV === 'production' ? 'http' : 'debug',
			format: winston.format.combine(
				winston.format.timestamp(),
				utilities.format.nestLike(process.env.NODE_ENV, {
					colors: true,
					prettyPrint: true,
				}),
			),
		}),
		new winstonDaily(dailyOption('warn')),
		new winstonDaily(dailyOption('error')),
	],
});
