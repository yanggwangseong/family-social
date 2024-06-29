import React, { FC } from 'react';
import styles from './CreateEvent.module.scss';
import LayerModalVariantWrapper from '../LayerModalVariantWrapper';
import CreateEvent from './CreateEvent';
import { useRecoilState } from 'recoil';
import { groupEventIdAtom } from '@/atoms/groupEventIdAtom';
import { useQuery } from 'react-query';
import { GroupEventService } from '@/services/group-event/group-event.service';

const CreateEventContainer: FC = () => {
	const [isGroupEventId, setIsGroupEventId] = useRecoilState(groupEventIdAtom);

	const { data, isLoading } = useQuery(
		['get-group-event-by-id', isGroupEventId.groupEventId],
		async () =>
			await GroupEventService.getOneGroupEvent(
				isGroupEventId.groupId,
				isGroupEventId.groupEventId,
			),
		{
			enabled: !!isGroupEventId.groupEventId, // isFeedId가 true일 때만 쿼리 활성화,
		},
	);

	if (isGroupEventId.groupEventId && !data) return null;

	return (
		<LayerModalVariantWrapper className={styles.create_event_container}>
			<CreateEvent event={data} isGroupEventId={isGroupEventId} />
		</LayerModalVariantWrapper>
	);
};

export default CreateEventContainer;
