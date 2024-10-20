import React, { FC, useReducer } from 'react';
import Image from 'next/image';
import styles from './GroupSelect.module.scss';
import { motion } from 'framer-motion';
import { AiOutlineCheck, AiOutlineEye } from 'react-icons/ai';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import {
	toggleVariant,
	toggleWrapperVariant,
} from '@/utils/animation/toggle-variant';
import { PiUsersThreeDuotone } from 'react-icons/pi';
import cn from 'classnames';
import { MemberBelongToGroupsResponse } from '@/shared/interfaces/group.interface';
import { useHover } from '@/hooks/useHover';

const GroupSelect: FC<{
	groupList: MemberBelongToGroupsResponse[];
	selectedGroupId: string;
	onSelectedGroupId: (groupId: string) => void;
}> = ({ groupList, selectedGroupId, onSelectedGroupId }) => {
	const [isSelectToggle, setIsSelectToggle] = useReducer(state => {
		return !state;
	}, false);

	const { handleMouseOver, handleMouseOut, isHovering } = useHover();

	const handleSelectedGroupId = (groupId: string) => {
		onSelectedGroupId(groupId);
		setIsSelectToggle();
	};

	return (
		<motion.div
			className={styles.public_select_container}
			initial={false}
			animate={isSelectToggle ? 'open' : 'closed'}
		>
			<motion.div
				className={styles.toggle_container}
				onClick={setIsSelectToggle}
				whileTap={{ scale: 0.97 }}
			>
				<div>
					<AiOutlineEye size={22} />
				</div>
				<div className={styles.option_text}>그룹명이 와야 겠군</div>
				<div>
					{isSelectToggle ? (
						<MdKeyboardArrowDown size={22} />
					) : (
						<MdKeyboardArrowUp size={22} />
					)}
				</div>
			</motion.div>

			<motion.div
				className={styles.select_layer_modal_container}
				variants={toggleWrapperVariant}
				style={{ pointerEvents: isSelectToggle ? 'auto' : 'none' }}
			>
				<motion.div
					className={styles.modal_title_container}
					variants={toggleVariant}
				>
					<div>
						<PiUsersThreeDuotone size={22} />
					</div>
					<div className={styles.modal_title}>
						선택된 그룹에 따라 멤버가 변경 됩니다
					</div>
				</motion.div>
				{groupList.map((group, index) => (
					<motion.div
						key={index}
						variants={toggleVariant}
						className={cn(styles.select_item, {
							[styles.active]: selectedGroupId === group.group.id,
						})}
						onClick={() => handleSelectedGroupId(group.group.id)}
					>
						<div className={styles.group_container}>
							<div className={styles.group_image_container}>
								<Image
									fill
									src={
										group.group.groupCoverImage ||
										'/images/banner/sm/group-base-sm.png'
									}
									alt="group-img"
								/>
							</div>
							<div className={styles.group_right_container}>
								<div className={styles.group_name}>{group.group.groupName}</div>
								<div className={styles.group_description}>
									{group.group.groupDescription}
								</div>
							</div>
						</div>

						{/* <ProfileHoverContainerModal
							group={group.group}
							handleMouseOver={handleMouseOver}
							handleMouseOut={handleMouseOut}
							isHovering={isHovering}
						/> */}
						{selectedGroupId === group.group.id && (
							<div className={styles.check_icon_wrapper}>
								<div className={styles.icon_container}>
									<AiOutlineCheck size={16} color="#e5855d" />
								</div>
							</div>
						)}
					</motion.div>
				))}
			</motion.div>
		</motion.div>
	);
};

export default GroupSelect;
