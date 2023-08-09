import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
// TODO config module 설정
// TODO TypeOrmModule module 설정
