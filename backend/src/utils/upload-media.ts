import {
	MulterBuilder,
	imageMimeTypes,
	mediaMimeTypes,
} from '@/common/builders/multer.builder';
import { BadRequestServiceException } from '@/common/exception/service.exception';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export const fileFilter =
	(kind: 'image' | 'media') => (req: any, file: any, cb: any) => {
		const types = kind === 'image' ? imageMimeTypes : mediaMimeTypes;
		const mimeType = types.find((im) => im === file.mimetype);
		if (!mimeType) {
			cb(
				BadRequestServiceException(`${types.join(', ')}만 저장할 수 있습니다.`),
				false,
			);
		}

		if (kind === 'media') {
			file.originalname = `${new Date().getTime()}`;
		}

		return cb(null, true);
	};

export const CreateBodyImageMulterOptions = (): MulterOptions => {
	return {
		fileFilter: fileFilter('image'),
		storage: new MulterBuilder()
			.allowImageMimeTypes()
			.setResource('feed')
			.setPath('body-media')
			.build(),
		limits: { fileSize: 1024 * 1024 * 20 },
	};
};
