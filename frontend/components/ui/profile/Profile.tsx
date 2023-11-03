import React, { FC, useState } from 'react';
import styles from './Profile.module.scss';
import Image from 'next/image';
import { AiOutlineEye } from 'react-icons/ai';
import { IoIosArrowUp } from 'react-icons/io';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

const Profile: FC<{
	commentContents?: string;
	profileImage?: string;
	username?: string;
	role?: string;
	isPublic?: 'public' | 'private';
}> = ({ commentContents, profileImage, username, role, isPublic }) => {
	const [isSelectToggle, setIsSelectToggle] = useState<boolean>(false);

	const handleSelectToggle = () => {
		setIsSelectToggle(!isSelectToggle);
	};
	return (
		<div className={styles.profile_container}>
			<div className={styles.profile_img_container}>
				<Image
					className="rounded-full"
					width={40}
					height={40}
					src={'/images/profile/profile.png'}
					alt="img"
				></Image>
			</div>
			<div>
				{commentContents && (
					<>
						<div className={styles.profile_comment_username}>양광성</div>
						<div className={styles.profile_comment_contents}>
							{commentContents}
						</div>
					</>
				)}

				{username && <div className={styles.profile_username}>양광성</div>}
				{isPublic && (
					<div className="relative">
						<div
							className="flex w-32 mt-1 px-2 py-1 border 
						border-solid border-customDark rounded-full cursor-pointer"
							onClick={handleSelectToggle}
						>
							<div>
								<AiOutlineEye size={22} />
							</div>
							<div className="font-bold text-sm mx-4">공개</div>
							<div>
								{isSelectToggle ? (
									<MdKeyboardArrowDown size={22} />
								) : (
									<MdKeyboardArrowUp size={22} />
								)}
							</div>
						</div>
						{isSelectToggle && (
							<div className="absolute p-4 bg-white z-20 left-0 top-9 w-[300px] border border-solid border-customDark rounded-tr-[44px] shadow-lg">
								<div className="flex pb-5">
									<div>
										<AiOutlineEye size={22} />
									</div>
									<div className="text-sm ml-2">피드를 공개/비공개 설정</div>
								</div>
								<div className="text-sm py-5">공개</div>
								<div className="text-sm py-5">비공개</div>
							</div>
						)}
					</div>
				)}
				{role && <div className={styles.profile_role}>관리자</div>}
			</div>
		</div>
	);
};

export default Profile;
