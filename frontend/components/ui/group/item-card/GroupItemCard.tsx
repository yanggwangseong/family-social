import React, { FC } from 'react';
import styles from './GroupItemCard.module.scss';
import { BsThreeDots } from 'react-icons/bs';
import GroupProfile from '@/ui/profile/group-profile/GroupProfile';
import Link from 'next/link';

const GroupItemCard: FC = () => {
	return (
		<div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-1">
			<div className="border border-solid border-customDark">
				<GroupProfile
					group={{
						id: 'sdfsdf',
						groupDescription: '양테스트를위한 그룹',
						groupName: '양테스트',
					}}
				/>
				<div className="p-3 w-full flex gap-2">
					<Link
						href={`/groups/33sdf`}
						className="bg-customOrange text-customDark 
				font-medium border border-solid border-customDark 
				rounded px-2 py-1 text-base inline-block text-center
				hover:bg-orange-500 w-2/3
				"
					>
						그룹 보기
					</Link>
					<div className="w-1/3 items-center flex justify-center border border-solid border-customDark rounded">
						<BsThreeDots size={24} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default GroupItemCard;
