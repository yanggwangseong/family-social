import { atom } from 'recoil';

export const MessageModalDefaultValue = {
	isMessageModal: false,
	chatId: '',
	isNewMessage: false,
};

export interface MessageModalAtomType {
	isMessageModal: boolean;
	chatId: string;
	isNewMessage: boolean;
}

export const messageModalAtom = atom<MessageModalAtomType>({
	default: MessageModalDefaultValue,
	key: 'messageModalAtom',
});
