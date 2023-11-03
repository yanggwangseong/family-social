import React, { FC, useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { Union, feedPublicSelectOptions } from 'types';

const FeedPublicSelect: FC<{
	isPublic: Union<typeof feedPublicSelectOptions>;
	onChageIsPublic?: (status: Union<typeof feedPublicSelectOptions>) => void;
}> = ({ isPublic, onChageIsPublic }) => {
	const [isSelectToggle, setIsSelectToggle] = useState<boolean>(false);

	const handleSelectToggle = () => {
		setIsSelectToggle(!isSelectToggle);
	};

	const handleChageIsPublic = (
		status: Union<typeof feedPublicSelectOptions>,
	) => {
		onChageIsPublic && onChageIsPublic(status);
		handleSelectToggle();
	};

	return (
		<div className="relative">
			<div
				className="flex w-36 mt-1 px-2 py-1 border 
border-solid border-customDark rounded-full cursor-pointer"
				onClick={handleSelectToggle}
			>
				<div>
					<AiOutlineEye size={22} />
				</div>
				<div className="font-bold text-sm mx-4 grow">
					{isPublic === 'public' ? '공개' : '비공개'}
				</div>
				<div>
					{isSelectToggle ? (
						<MdKeyboardArrowDown size={22} />
					) : (
						<MdKeyboardArrowUp size={22} />
					)}
				</div>
			</div>
			{isSelectToggle && (
				<div
					className="absolute p-4 bg-white z-20 left-0 top-9 w-[300px] border 
    border-solid border-customDark rounded-tr-[44px] shadow-lg"
				>
					<div className="flex pb-5">
						<div>
							<AiOutlineEye size={22} />
						</div>
						<div className="text-sm ml-2">피드를 공개/비공개 설정</div>
					</div>
					<div
						className="text-sm py-5 cursor-pointer"
						onClick={() => handleChageIsPublic('public')}
					>
						공개
					</div>
					<div
						className="text-sm py-5 cursor-pointer"
						onClick={() => handleChageIsPublic('private')}
					>
						비공개
					</div>
				</div>
			)}
		</div>
	);
};

export default FeedPublicSelect;
