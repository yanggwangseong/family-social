import { ContentTypeId } from '@/constants/content-type.constant';
import { atom } from 'recoil';
import { Union } from 'types';

export const contentIdsAtom = atom<Union<typeof ContentTypeId>[]>({
	default: [],
	key: 'contentIds',
});
