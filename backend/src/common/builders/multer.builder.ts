import path from 'path';

import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import { Request } from 'express';
import multerS3 from 'multer-s3';

dotenv.config({
	path: path.resolve(
		process.env.NODE_ENV === 'production'
			? '.production.env'
			: process.env.NODE_ENV === 'stage'
			? '.stage.env'
			: '.development.env',
	),
});

export const imageMimeTypes = [
	'image/jpg',
	'image/jpeg',
	'image/png',
	'image/bmp',
	'image/webp',
];
export const mediaMimeTypes = ['video/mp4'];

export class MulterBuilder {
	private readonly s3: S3Client;
	private readonly bucketName: string;
	private readonly allowedMimeTypes: Array<string> = [];

	private resource = '';
	private path = '';

	constructor() {
		this.s3 = new S3Client({
			region: process.env.AWS_BUCKET_REGION,
			credentials: {
				accessKeyId: String(process.env.AWS_ACCESS_KEY_ID),
				secretAccessKey: String(process.env.AWS_SECRET_ACCESS_KEY),
			},
		});
		this.bucketName = String(process.env.AWS_BUCKET_NAME);
	}

	allowImageMimeTypes() {
		this.allowedMimeTypes.push(...imageMimeTypes);
		return this;
	}

	allowMediaMimeTypes() {
		this.allowedMimeTypes.push(...mediaMimeTypes);
		return this;
	}

	setResource(keyword: string) {
		this.resource = keyword;
		return this;
	}

	setPath(path: string) {
		this.path = path;
		return this;
	}

	build() {
		return multerS3({
			s3: this.s3,
			bucket: this.bucketName,
			acl: 'public-read',
			contentType: multerS3.AUTO_CONTENT_TYPE,
			key: (req: Request, file, callback) => {
				let filename;
				const splitedFileNames = file.originalname.split('.');
				const extension = splitedFileNames.at(splitedFileNames.length - 1);
				if (this.path) {
					filename = `${process.env.NODE_ENV}${
						this.path
					}/${new Date().getTime()}.${extension}`;
				} else {
					filename = `${
						process.env.NODE_ENV
					}${new Date().getTime()}.${extension}`;
				}
				return callback(null, encodeURI(`${this.resource}/${filename}`));
			},
		});
	}

	async setDeleteS3Media(key: string) {
		const command = new DeleteObjectCommand({
			Bucket: this.bucketName,
			Key: key,
		});
		return await this.s3.send(command);
	}
}
