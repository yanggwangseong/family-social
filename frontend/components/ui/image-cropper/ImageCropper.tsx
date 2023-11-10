import React, { FC, useRef, useState } from 'react';
import { Cropper, ReactCropperElement } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import CustomButton from '../button/custom-button/CustomButton';
import styles from './ImageCropper.module.scss';

interface PropsType {
	onCrop: (image: string) => void;
	aspectRatio: number;
	children: React.ReactNode;
}

//const ImageCropper = ({ children, aspectRatio, onCrop }: PropsType) => {
const ImageCropper: FC<PropsType> = ({ children, aspectRatio, onCrop }) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const cropperRef = useRef<ReactCropperElement>(null);
	const [image, setImage] = useState<null | string>(null);

	const handleChildrenClick = () => {
		if (inputRef.current) inputRef.current.click();
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();

		const files = e.target.files;

		if (!files) return;

		const reader = new FileReader();
		reader.onload = () => {
			setImage(reader.result as string);
		};
		reader.readAsDataURL(files[0]);
	};

	const getCropData = () => {
		if (typeof cropperRef.current?.cropper !== 'undefined') {
			onCrop(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
			setImage(null);
		}
	};

	return (
		<div>
			<input
				type="file"
				ref={inputRef}
				style={{ display: 'none' }}
				onChange={handleFileChange}
			/>
			<span className={styles.child_container} onClick={handleChildrenClick}>
				{children}
			</span>
			{image && (
				<div className={styles.img_container}>
					<div className={styles.img_cropper_container}>
						<Cropper
							ref={cropperRef}
							aspectRatio={aspectRatio}
							src={image}
							viewMode={1}
							background={false}
							responsive
							autoCropArea={1}
							checkOrientation={false}
							movable={true} //이미지 이동가능
							cropBoxResizable={true} // 자르기 상자 크기 조절
							cropBoxMovable={true} // 자르기 상자 이동
							minCropBoxWidth={120}
							minCropBoxHeight={120}
							zoomable={true} // 줌가능
							wheelZoomRatio={0.1}
							guides
							style={{ height: 400, width: '100%' }}
						/>
					</div>

					<div className={styles.footer_wrap}>
						<div className={styles.botton_container}>
							<CustomButton
								type="button"
								className="mt-8 mb-4 bg-white text-customDark 
										font-bold border border-solid border-customDark 
										rounded-full p-[10px] w-full hover:opacity-80"
								onClick={() => setImage(null)}
							>
								취소
							</CustomButton>
							<CustomButton
								type="button"
								className="mt-8 mb-4 bg-customOrange text-customDark 
								font-bold border border-solid border-customDark 
								rounded-full p-[10px]
								w-full hover:bg-orange-500
								"
								onClick={getCropData}
							>
								적용하기
							</CustomButton>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ImageCropper;
