import { modalAtom } from '@/atoms/modalAtom';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import { AuthService } from '@/services/auth/auth.service';
import React, { FC } from 'react';
import { useRecoilState } from 'recoil';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { useRouter } from 'next/router';
import LayerModalVariantWrapper from './LayerModalVariantWrapper';
import { useCreateMutation } from '@/hooks/useCreateMutation';

const LogOutConfirm: FC = () => {
	const [, setIsShowing] = useRecoilState<boolean>(modalAtom);
	const router = useRouter();

	const { mutate: logoutSync } = useCreateMutation(
		async () => await AuthService.logout(),
		{
			mutationKey: ['logout'],
			onSuccess: data => {
				Loading.remove();
				Report.success('성공', '로그아웃 되었습니다.', '확인', () => {
					setIsShowing(false);
					router.push('/signin');
				});
			},
		},
	);

	const handleClick = () => {
		logoutSync();
	};
	return (
		<LayerModalVariantWrapper>
			<div className="my-10 text-sm text-customGray">
				정말 로그아웃 하시겠습니까?
			</div>
			<div className="flex w-full gap-5">
				<CustomButton
					type="button"
					className="mt-8 mb-4 bg-customDark text-customOrange 
        font-bold border border-solid border-customDark 
        rounded-full p-[10px] w-full hover:opacity-80"
					onClick={handleClick}
				>
					삭제
				</CustomButton>

				<CustomButton
					type="button"
					className="mt-8 mb-4 bg-white text-customDark 
        font-bold border border-solid border-customDark 
        rounded-full p-[10px] w-full hover:bg-gray-200"
					onClick={() => setIsShowing(false)}
				>
					취소
				</CustomButton>
			</div>
		</LayerModalVariantWrapper>
	);
};

export default LogOutConfirm;
