import { atom } from 'recoil';

export const MessageModalDefaultValue = {
	isMessageModal: false,
	chatId: '',
	isNewMessage: false,
	memberIds: [],
};

export interface MessageModalAtomType {
	isMessageModal: boolean;
	chatId: string;
	isNewMessage: boolean;
	memberIds: string[];
}

export const messageModalAtom = atom<MessageModalAtomType>({
	default: MessageModalDefaultValue,
	key: 'messageModalAtom',
});
