import React, { FC } from 'react';
import styles from './GroupEventItem.module.scss';
import { motion } from 'framer-motion';
import { easeOutAnimation } from '@/utils/animation/ease-out';

const GroupEventItem: FC<{ index: number }> = ({ index }) => {
	return (
		<>
			<motion.div {...easeOutAnimation(index)}>
				<div className={styles.group_event_container}></div>
			</motion.div>
		</>
	);
};

export default GroupEventItem;
