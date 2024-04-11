import Format from '@/components/ui/layout/Format';
import { NotificationService } from '@/services/notification/notification.service';
import React, { FC } from 'react';
import { useQuery } from 'react-query';
import { isReadOptions } from 'types';

const NotificationContainer: FC = () => {
	const { data, isLoading } = useQuery(
		['get-notifications', isReadOptions[0]],
		async () => await NotificationService.getNotifications('ALL'),
	);

	return (
		<Format title={'notification'}>
			<div>ff</div>
		</Format>
	);
};

export default NotificationContainer;
