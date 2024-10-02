import { atom } from 'recoil';
import { ChatType, Union } from 'types';

export const MessageModalDefaultValue = {
	isMessageModal: false,
	chatId: '',
	isNewMessage: false,
	memberIds: [],
	groupId: '',
	chatType: 'DIRECT' as const,
};

export interface MessageModalAtomType {
	isMessageModal: boolean;
	chatId: string;
	isNewMessage: boolean;
	memberIds: string[];
	chatType: Union<typeof ChatType>;
	groupId?: string;
}

export const messageModalAtom = atom<MessageModalAtomType>({
	default: MessageModalDefaultValue,
	key: 'messageModalAtom',
});
