import { Union, eventOptionsLists } from 'types';

export interface ScheduleEventTypeProps {
	options: Union<typeof eventOptionsLists>;
	onChangeEventType: (option: Union<typeof eventOptionsLists>) => void;
}
