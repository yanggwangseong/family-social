import React, { FC } from 'react';
import styles from './Skeleton.module.scss';

const Skeleton: FC = () => {
	return (
		<div className={styles.skeleton_container}>
			<div className={styles.main_wrap}>
				<div className={styles.skeleton_avatar}></div>
				<div className={styles.skeleton_contents_container}>
					<div className={styles.skeleton_line_one}></div>
					<div className={styles.skeleton_multi_container}>
						<div className={styles.wrap}>
							<div className={styles.multi_line_two}></div>
							<div className={styles.multi_line_one}></div>
						</div>
						<div className={styles.skeleton_line_one}></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Skeleton;
