import { atom } from 'recoil';

export const MessageModalDefaultValue = {
	isMessageModal: false,
	chatId: '',
};

export interface MessageModalAtomType {
	isMessageModal: boolean;
	chatId: string;
}

export const messageModalAtom = atom<MessageModalAtomType>({
	default: MessageModalDefaultValue,
	key: 'messageModalAtom',
});
