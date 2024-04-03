import React, { FC } from 'react';
import { InviteItemProps } from './invite-item.interface';
import { PiAtDuotone } from 'react-icons/pi';

const InviteItem: FC<InviteItemProps> = ({
	handleExcludeInviteEmail,
	email,
}) => {
	const onExcludeInviteEmail = () => {
		handleExcludeInviteEmail(email);
	};

	return (
		<div className="flex items-center gap-4">
			<div>
				<PiAtDuotone size={22} />
			</div>
			<div>{email}</div>
			<div className="ml-auto" onClick={onExcludeInviteEmail}>
				x
			</div>
		</div>
	);
};

export default InviteItem;
