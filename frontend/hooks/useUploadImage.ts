import { blobToFile } from '@/utils/file';
import { useEffect, useState } from 'react';

export const useUploadImage = () => {
	const [isFiles, setIsFiles] = useState<File>();
	const [uploadImage, setUploadImage] = useState<{
		image: Blob | null;
		fileName: string;
	}>({ image: null, fileName: '' });

	const handleUploadImage = (image: Blob, fileName: string) =>
		setUploadImage({ image, fileName });

	useEffect(() => {
		if (uploadImage.image) {
			const file = blobToFile(uploadImage.image, uploadImage.fileName);
			setIsFiles(file);
		}
	}, [uploadImage]);

	return {
		uploadImage,
		isFiles,
		handleUploadImage,
	};
};
