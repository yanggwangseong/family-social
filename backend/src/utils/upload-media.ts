import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

import {
	MulterBuilder,
	imageMimeTypes,
	mediaMimeTypes,
} from '@/common/builders/multer.builder';
import { BadRequestServiceException } from '@/common/exception/service.exception';

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

export const CreateMemberProfileImageMulterOptions = (): MulterOptions => {
	return {
		fileFilter: fileFilter('image'),
		storage: new MulterBuilder()
			.allowImageMimeTypes()
			.setResource('member')
			.setPath('profile-image')
			.build(),
		limits: { fileSize: 1024 * 1024 * 20 },
	};
};

export const CreateMemberCoverImageMulterOptions = (): MulterOptions => {
	return {
		fileFilter: fileFilter('image'),
		storage: new MulterBuilder()
			.allowImageMimeTypes()
			.setResource('member')
			.setPath('cover-image')
			.build(),
		limits: { fileSize: 1024 * 1024 * 20 },
	};
};

export const createScheduleThumbnailImageMulterOptions = (): MulterOptions => {
	return {
		fileFilter: fileFilter('image'),
		storage: new MulterBuilder()
			.allowImageMimeTypes()
			.setResource('schedule')
			.setPath('thumbnail-image')
			.build(),
		limits: { fileSize: 1024 * 1024 * 20 },
	};
};

export const createGroupCoverImageMulterOptions = (): MulterOptions => {
	return {
		fileFilter: fileFilter('image'),
		storage: new MulterBuilder()
			.allowImageMimeTypes()
			.setResource('group')
			.setPath('cover-image')
			.build(),
		limits: { fileSize: 1024 * 1024 * 20 },
	};
};

export const DeleteS3Media = (key: string) => {
	return new MulterBuilder().setDeleteS3Media(key);
};
