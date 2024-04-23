import React, { FC } from 'react';
import styles from './GroupItemCard.module.scss';
import { BsThreeDots } from 'react-icons/bs';
import GroupProfile from '@/ui/profile/group-profile/GroupProfile';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { INLINEBUTTONGESTURE } from '@/utils/animation/gestures';

const GroupItemCard: FC = () => {
	return (
		<div className="w-full sm:w-1/2 px-2 py-3">
			<div className="border border-solid border-customDark">
				<GroupProfile
					group={{
						id: 'sdfsdf',
						groupDescription: '양테스트를위한 그룹',
						groupName: '양테스트',
					}}
				/>
				<div className="p-3 w-full flex gap-2">
					<motion.div className="w-2/3" {...INLINEBUTTONGESTURE}>
						<Link
							href={`/groups/33sdf`}
							className="bg-customOrange text-customDark 
							font-medium border border-solid border-customDark 
							rounded px-2 py-1 text-base inline-block text-center
							hover:bg-orange-500 w-full
							"
						>
							그룹 보기
						</Link>
					</motion.div>
					<motion.div
						{...INLINEBUTTONGESTURE}
						className="w-1/3 items-center flex justify-center border border-solid border-customDark rounded cursor-pointer"
					>
						<BsThreeDots size={24} />
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default GroupItemCard;
