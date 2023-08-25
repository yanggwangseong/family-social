import { ConfigModule, ConfigService } from '@nestjs/config';

export const EmailOptions = {
	imports: [ConfigModule],
	inject: [ConfigService],
	useFactory: async (configService: ConfigService) => {
		const option = {
			transport: {
				host: configService.get<string>('MAIL_HOST'),
				port: Number(configService.get<number>('MAIL_PORT')),
				secure: false,
				auth: {
					user: configService.get<string>('MAIL_USER'),
					pass: configService.get<string>('MAIL_PWD'),
				},
			},
		};

		return option;
	},
};
