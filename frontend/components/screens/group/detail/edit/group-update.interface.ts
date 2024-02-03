import { EditMode, Union } from 'types';

export interface UpdateGroupFields {
	groupId: string;
	groupName: string;
	groupDescription: string;
}

export type GroupDetailEditModeType = Extract<
	Union<typeof EditMode>,
	'reset' | 'information' | 'visitMessage'
>;
