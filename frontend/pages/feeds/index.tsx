import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import Field from '@/components/ui/field/Field';
import { NextPage } from 'next';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { AuthService } from '@/services/auth/auth.service';
import { useMutation } from 'react-query';
import axios from 'axios';
import Image from 'next/image';

type FormData = {
	image: File[]; // 이미지 파일을 File 타입으로 정의
};

const FeedsPage: NextPage = () => {
	const [IsImage, setIsImage] = useState<string>('');
	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
		reset,
		getValues,
		watch,
	} = useForm<FormData>({
		mode: 'onChange',
	});

	const { mutate: verifySync } = useMutation(
		['emailverify'],
		(data: FormData) => AuthService.uploadfile(data.image),
		{
			onMutate: variable => {
				Loading.hourglass();
			},
			onSuccess(data: any) {
				Loading.remove();
				Report.success(
					'성공',
					`${data.username}님 로그인 페이지에서 로그인 해주세요.`,
					'확인',
					() => setIsImage(data[0]),
				);
			},
			onError(error) {
				if (axios.isAxiosError(error)) {
					Report.warning(
						'실패',
						`${error.response?.data.message}`,
						'확인',
						() => Loading.remove(),
					);
				}
			},
		},
	);

	const onSubmit: SubmitHandler<FormData> = data => {
		verifySync(data);
	};

	const handleAddDocuments = (event: any) => {
		const uploadedFiles = Array.from(event.target.files);

		const files = uploadedFiles.map(file => ({
			file,
		}));
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Image src={IsImage} width={200} height={200} alt={IsImage}></Image>
				<div>확인 코드</div>
				<Field
					{...register('image', {
						required: '이메일 확인 코드를 입력 해주세요',
					})}
					multiple
					type={'file'}
					onChange={handleAddDocuments}
				/>

				<CustomButton
					type="submit"
					className="mt-8 bg-customOrange text-customDark font-bold border border-solid border-customDark rounded-full p-[10px] w-full"
					disabled={!isValid}
				>
					확인
				</CustomButton>
			</form>
		</div>
	);
};

export default FeedsPage;
