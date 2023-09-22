import React, { FC, useState } from 'react';
import styles from './GroupDetailSidebar.module.scss';
import GroupProfile from '@/components/ui/profile/group-profile/GroupProfile';
import {
	BsLink45Deg,
	BsPersonFill,
	BsTelephonePlus,
	BsThreeDots,
	BsHouseDoor,
} from 'react-icons/bs';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { FiSettings } from 'react-icons/fi';
import { TbDoorExit } from 'react-icons/tb';
import Line from '@/components/ui/line/Line';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import Link from 'next/link';

const GroupDetailSidebar: FC<{ groupId: string }> = ({ groupId }) => {
	const [isOpenInvitation, setOpenInvitation] = useState<boolean>(false);
	const [isOpenSetting, setOpenSetting] = useState<boolean>(false);
	const [isToggleSetting, setToggleSetting] = useState<boolean>(true);
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
				<div className="flex justify-center items-center w-4/5 relative">
					<CustomButton
						type="button"
						className="bg-customOrange text-customDark 
					font-bold border border-solid border-customDark 
					rounded-full p-[10px] w-full
					hover:bg-orange-500
					"
						onClick={() => setOpenInvitation(!isOpenInvitation)}
					>
						+ 초대하기
					</CustomButton>
					{isOpenInvitation && (
						<div
							className="absolute top-20 left-0 border 
							border-solid border-customDark bg-white w-80 p-4
							shadow-2xl rounded-tr-[44px]
							"
						>
							<div className="flex p-2 hover:bg-basic rounded-lg cursor-pointer">
								<div className="flex justify-center items-center">
									<BsTelephonePlus size={22} />
								</div>
								<div className="flex flex-col ml-4">
									<div>전화번호로 초대하기</div>
									<div className="text-xs text-customGray">
										전화번호 통해서 검색하여 초대를 보냅니다
									</div>
								</div>
							</div>
							<div className="flex p-2 hover:bg-basic rounded-lg cursor-pointer">
								<div className="flex justify-center items-center">
									<BsLink45Deg size={22} />
								</div>
								<div className="flex flex-col ml-4">
									<div>링크로 초대하기</div>
									<div className="text-xs text-customGray">
										링크를 통해서 초대 할 수 있습니다
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
				<div className="flex justify-center items-center ml-auto cursor-pointer relative">
					<BsThreeDots
						size={22}
						onClick={() => setOpenSetting(!isOpenSetting)}
					/>
					{isOpenSetting && (
						<div
							className="absolute top-20 left-0 border 
							border-solid border-customDark bg-white w-80 p-4
							shadow-2xl rounded-tr-[44px]
							"
						>
							<div className="flex p-2 hover:bg-basic rounded-lg cursor-pointer">
								<div className="flex justify-center items-center">
									<TbDoorExit size={22} />
								</div>
								<div className="flex flex-col ml-4">
									<div>그룹 삭제</div>
									<div className="text-xs text-customGray">
										관리자만 그룹을 삭제 할 수 있습니다
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
			<div className="p-4 mt-4">
				<div className="flex p-2 hover:text-customOrange rounded-lg cursor-pointer">
					<div className="flex justify-center items-center">
						<BsHouseDoor size={22} />
					</div>
					<div className="flex flex-col ml-4">
						<div>커뮤니티 홈</div>
					</div>
				</div>
			</div>

			<Line />

			<div className="p-4">
				<div
					className="flex p-2 hover:text-customOrange rounded-lg cursor-pointer"
					onClick={() => setToggleSetting(!isToggleSetting)}
				>
					<div className="text-customGray font-medium hover:text-customOrange">
						관리자 도구
					</div>
					<div className="ml-auto flex justify-center items-center">
						{isToggleSetting ? (
							<IoIosArrowUp size={22} />
						) : (
							<IoIosArrowDown size={22} />
						)}
					</div>
				</div>
				{isToggleSetting && (
					<>
						<Link
							className="flex p-2 hover:text-customOrange rounded-lg cursor-pointer"
							href={`/groups/${groupId}/edit`}
						>
							<div className="flex justify-center items-center">
								<FiSettings size={22} />
							</div>
							<div className="flex flex-col ml-4">
								<div>그룹 설정</div>
								<div className="text-xs text-customGray hover:text-customOrange">
									그룹 정보 수정 등 관리
								</div>
							</div>
						</Link>
					</>
				)}
			</div>
		</div>
	);
};

export default GroupDetailSidebar;
