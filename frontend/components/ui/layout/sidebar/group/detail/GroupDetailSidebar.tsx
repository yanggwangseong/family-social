import React, { FC } from 'react';
import styles from './GroupDetailSidebar.module.scss';
import GroupProfile from '@/components/ui/profile/group-profile/GroupProfile';
import { BsPersonFill, BsThreeDots } from 'react-icons/bs';
import Line from '@/components/ui/line/Line';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';

const GroupDetailSidebar: FC = () => {
	return (
		<div className={styles.sidebar_container}>
			<GroupProfile
				group={{
					id: 'sdfsdf',
					groupDescription: '한국을 좋아하는 그룹입니다',
					groupName: 'korea',
				}}
			/>
			<Line />
			<div className="mt-6 flex justify-center">
				<div className="flex justify-center items-center">
					<BsPersonFill size={24} color="#707070" />
				</div>
				<div className="ml-10 text-customGray">1명</div>
			</div>
			<Line />
			<div className={styles.sidebar_btn_container}>
				<div className="flex justify-center items-center w-4/5">
					<CustomButton
						type="button"
						className="bg-customOrange text-customDark 
					font-bold border border-solid border-customDark 
					rounded-full py-4 px-4 w-full
					hover:bg-orange-500
					"
					>
						+ 초대하기
					</CustomButton>
				</div>
				<div className="flex justify-center items-center ml-auto">
					<BsThreeDots />
				</div>
			</div>
		</div>
	);
};

export default GroupDetailSidebar;
