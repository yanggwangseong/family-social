import React, { FC } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { AiFillStar } from 'react-icons/ai';
import styles from './HeartAndStar.module.scss';

const HeartAndStar: FC = () => {
	return (
		<div className={styles.heart_and_star_container}>
			<div className={styles.heart_container}>
				<AiFillHeart size={14} color="#FB1F42" />
				<span className={styles.score}>0</span>
			</div>
			<div className={styles.star_container}>
				<AiFillStar size={14} color="rgb(253, 224, 71)" />
				<span className={styles.score}>0</span>
			</div>
		</div>
	);
};

export default HeartAndStar;
