import { atom } from 'recoil';

export interface ScheduleIdAtomType {
	groupId: string;
	scheduleId: string;
}

export const ScheduleIdAtomDefaultValue = {
	groupId: '',
	scheduleId: '',
};

export const scheduleIdAtom = atom<ScheduleIdAtomType>({
	default: ScheduleIdAtomDefaultValue,
	key: 'scheduleIdAtom',
});
