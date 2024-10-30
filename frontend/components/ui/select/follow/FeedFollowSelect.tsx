import React, { FC, useState } from 'react';
import styles from './FeedFollowSelect.module.scss';
import { motion } from 'framer-motion';
import { AiOutlineCheck, AiOutlineEye } from 'react-icons/ai';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { RiUserFollowLine } from 'react-icons/ri';
import {
	toggleVariant,
	toggleWrapperVariant,
} from '@/utils/animation/toggle-variant';
import cn from 'classnames';

const FeedFollowSelect: FC<{
	isVisibleToFollowersOptions: boolean;
	onChangeIsVisibleToFollowersOptions: (status: boolean) => void;
}> = ({ isVisibleToFollowersOptions, onChangeIsVisibleToFollowersOptions }) => {
	const [isSelectToggle, setIsSelectToggle] = useState<boolean>(false);

	const handleSelectToggle = () => {
		setIsSelectToggle(!isSelectToggle);
	};

	const handleChageIsPublic = (isVisibleToFollowersOptions: boolean) => {
		onChangeIsVisibleToFollowersOptions(isVisibleToFollowersOptions);
		handleSelectToggle();
	};

	return (
		<motion.div
			className={styles.public_select_container}
			initial={false}
			animate={isSelectToggle ? 'open' : 'closed'}
		>
			<motion.div
				className={styles.toggle_container}
				onClick={handleSelectToggle}
				whileTap={{ scale: 0.97 }}
			>
				<div>
					<RiUserFollowLine size={22} />
				</div>
				<div className={styles.option_text}>
					{isVisibleToFollowersOptions
						? '해당 그룹 팔로워에게 공개'
						: '그룹간 서로 팔로워시에만 공개'}
				</div>
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
						<RiUserFollowLine size={22} />
					</div>
					<div className={styles.modal_title}>
						그룹간의 팔로워 상태에 따라 공개
					</div>
				</motion.div>
				<motion.div
					className={cn(styles.select_item, {
						[styles.active]: isVisibleToFollowersOptions === true,
					})}
					variants={toggleVariant}
					onClick={() => handleChageIsPublic(true)}
				>
					그룹간 서로 팔로워시에만 공개
					{isVisibleToFollowersOptions === true && (
						<div className={styles.icon_container}>
							<AiOutlineCheck size={14} color="#e5855d" />
						</div>
					)}
				</motion.div>
				<motion.div
					className={cn(styles.select_item, {
						[styles.active]: isVisibleToFollowersOptions === false,
					})}
					variants={toggleVariant}
					onClick={() => handleChageIsPublic(false)}
				>
					해당 그룹 팔로워에게 공개
					{isVisibleToFollowersOptions === false && (
						<div className={styles.icon_container}>
							<AiOutlineCheck size={14} color="#e5855d" />
						</div>
					)}
				</motion.div>
			</motion.div>
		</motion.div>
	);
};

export default FeedFollowSelect;
