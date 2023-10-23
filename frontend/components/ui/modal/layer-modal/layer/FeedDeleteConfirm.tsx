import { modalAtom } from '@/atoms/modalAtom';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import axios from 'axios';
import React, { FC } from 'react';
import { useRecoilState } from 'recoil';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { useMutation } from 'react-query';
import { feedIdAtom } from '@/atoms/feedIdAtom';
import { FeedService } from '@/services/feed/feed.service';

const FeedDeleteConfirm: FC = () => {
	return (
		<div>
			<div className="my-10 text-sm text-customGray">
				정말 해당 피드를 삭제하시겠습니까?
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
		</div>
	);
};

export default FeedDeleteConfirm;
