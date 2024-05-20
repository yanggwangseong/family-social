import React, { FC } from 'react';
import styles from './SelectProfile.module.scss';
import Image from 'next/image';
import { AiOutlineCheck } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { INLINEBUTTONGESTURE } from '@/utils/animation/gestures';

const SelectProfile: FC = () => {
	return (
		<motion.div className={styles.container} {...INLINEBUTTONGESTURE}>
			<div className={styles.check_icon_container}>
				<AiOutlineCheck size={20} color="#0a0a0a" />
			</div>
			<div className={styles.profile_container}>
				<div className={styles.profile_img_container}>
					<Image
						className={styles.profile_img}
						fill
						src={'/images/profile/profile.png'}
						alt="img"
					></Image>
				</div>
				<div className={styles.profile_right_container}>
					<div className={styles.profile_username}>양광성</div>
					<div className={styles.profile_role}>관리자</div>
				</div>
			</div>
		</motion.div>
	);
};

export default SelectProfile;
