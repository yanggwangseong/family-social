import React, { FC, useState } from 'react';
import { AiOutlineCheck, AiOutlineEye } from 'react-icons/ai';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { Union, feedPublicSelectOptions } from 'types';
import styles from './FeedPublicSelect.module.scss';
import cn from 'classnames';
import { motion } from 'framer-motion';
import {
	toggleVariant,
	toggleWrapperVariant,
} from '@/utils/animation/toggle-variant';

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
					<AiOutlineEye size={22} />
				</div>
				<div className={styles.option_text}>
					{isPublic === 'public' ? '공개' : '비공개'}
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
						<AiOutlineEye size={22} />
					</div>
					<div className={styles.modal_title}>피드를 공개/비공개 설정</div>
				</motion.div>
				<motion.div
					className={cn(styles.select_item, {
						[styles.active]: isPublic === 'public',
					})}
					variants={toggleVariant}
					onClick={() => handleChageIsPublic('public')}
				>
					공개
					{isPublic === 'public' && (
						<div className={styles.icon_container}>
							<AiOutlineCheck size={14} color="#e5855d" />
						</div>
					)}
				</motion.div>
				<motion.div
					className={cn(styles.select_item, {
						[styles.active]: isPublic === 'private',
					})}
					variants={toggleVariant}
					onClick={() => handleChageIsPublic('private')}
				>
					비공개
					{isPublic === 'private' && (
						<div className={styles.icon_container}>
							<AiOutlineCheck size={14} color="#e5855d" />
						</div>
					)}
				</motion.div>
			</motion.div>
		</motion.div>
	);
};

export default FeedPublicSelect;
