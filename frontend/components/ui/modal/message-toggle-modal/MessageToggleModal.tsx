import React, { FC } from 'react';
import styles from './MessageToggleModal.module.scss';
import Profile from '../../profile/Profile';
import { IoCloseSharp } from 'react-icons/io5';

const MessageToggleModal: FC = () => {
	return (
		<div className={styles.container}>
			<div className={styles.top_container}>
				<div className={styles.top_wrap}>
					<div>
						<Profile />
					</div>
					<div>양우성</div>
					<div className={styles.close_btn}>
						<IoCloseSharp size={24} />
					</div>
				</div>
			</div>
			<div className={styles.body_container}>
				<div className={styles.message_container}>
					<div className={styles.message_card_container}>
						<Profile />
						<div className={styles.description_container}>
							<div className={styles.description_wrapper}>
								<div className={styles.description}>
									Hell2323Hell2323Hell2323Hell2323Hell2323Hell2323
								</div>
							</div>
						</div>
					</div>
					<div className={styles.message_card_container}>
						<Profile />
						<div className={styles.description_container}>
							<div className={styles.description_wrapper}>
								<div className={styles.description}>
									Hell2323Hell2323Hell2323Hell2323Hell2323Hell2323
								</div>
							</div>
						</div>
					</div>
					<div className={styles.message_card_container}>
						<Profile />
						<div className={styles.description_container}>
							<div className={styles.description_wrapper}>
								<div className={styles.description}>
									Hell2323Hell2323Hell2323Hell2323Hell2323Hell2323
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.bottom_container}>
					<div>message</div>
				</div>
			</div>
		</div>
	);
};

export default MessageToggleModal;
