import React, { FC } from 'react';
import { InviteItemProps } from './invite-item.interface';
import { PiAtDuotone } from 'react-icons/pi';
import styles from './InviteItem.module.scss';

const InviteItem: FC<InviteItemProps> = ({
	handleExcludeInviteEmail,
	email,
}) => {
	const onExcludeInviteEmail = () => {
		handleExcludeInviteEmail(email);
	};

	return (
		<div className={styles.container}>
			<div className={styles.icon_container}>
				<PiAtDuotone size={22} />
			</div>
			<div className={styles.invite_email}>{email}</div>
			<div
				className={styles.close_btn_container}
				onClick={onExcludeInviteEmail}
			>
				x
			</div>
		</div>
	);
};

export default InviteItem;
