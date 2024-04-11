import React, { FC } from 'react';
import styles from './NotificationItem.module.scss';
import Profile from '@/components/ui/profile/Profile';
import Image from 'next/image';

const NotificationItem: FC = () => {
	return (
		<div className="flex gap-4">
			<div>
				<Image
					className="rounded-full border border-solid border-customDark"
					width={40}
					height={40}
					src={'/images/profile/profile.png'}
					alt="img"
				></Image>
			</div>

			<div className="flex flex-col gap-2 w-full">
				<div className="font-semibold text-sm">
					Alexandre mentioned you in a
				</div>
				<div className=" font-light text-customGray text-sm">2024-04-02</div>
			</div>
		</div>
	);
};

export default NotificationItem;
