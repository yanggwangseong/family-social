import React, { FC } from 'react';
import styles from './InvitationItem.module.scss';
import Profile from '@/components/ui/profile/Profile';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import GroupProfile from '@/components/ui/profile/group-profile/GroupProfile';

const InvitationItem: FC = () => {
	return (
		<div className="flex flex-col gap-5">
			<div className="w-full p-4 border border-solid border-customDark flex flex-col gap-4">
				<div className="flex">
					<div className="flex w-1/2">
						<div className="flex justify-center items-center">
							<div className="mr-10">그룹</div>
						</div>
						<GroupProfile></GroupProfile>
					</div>
				</div>
				<div className="mt-5">
					<div>회원님을 이 그룹에 가입하도록 초대했습니다.</div>
				</div>
				<div className="flex w-full gap-1">
					<CustomButton
						type="button"
						className="mt-8 mb-4 bg-customDark text-customOrange font-bold border border-solid border-customDark rounded-full py-4 px-4 w-full hover:opacity-80"
					>
						수락
					</CustomButton>

					<CustomButton
						type="button"
						className="mt-8 mb-4 bg-basic text-customDark font-bold border border-solid border-customDark rounded-full py-4 px-4 w-full hover:opacity-80"
					>
						거절
					</CustomButton>
				</div>
			</div>
			<div className="w-full p-4 border border-solid border-customDark flex flex-col gap-4">
				<div className="flex">
					<div className="flex w-1/2">
						<div className="flex justify-center items-center">
							<div className="mr-10">그룹</div>
						</div>
						<GroupProfile></GroupProfile>
					</div>
				</div>
				<div className="mt-5">
					<div>회원님을 이 그룹에 가입하도록 초대했습니다.</div>
				</div>
				<div className="flex w-full gap-1">
					<CustomButton
						type="button"
						className="mt-8 mb-4 bg-customDark text-customOrange font-bold border border-solid border-customDark rounded-full py-4 px-4 w-full hover:opacity-80"
					>
						수락
					</CustomButton>

					<CustomButton
						type="button"
						className="mt-8 mb-4 bg-basic text-customDark font-bold border border-solid border-customDark rounded-full py-4 px-4 w-full hover:opacity-80"
					>
						거절
					</CustomButton>
				</div>
			</div>
		</div>
	);
};

export default InvitationItem;
