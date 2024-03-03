import { atom } from 'recoil';

export interface MessageModalAtomType {
	isMessageModal: boolean;
	chatId: string;
}

export const messageModalAtom = atom<MessageModalAtomType>({
	default: {
		isMessageModal: false,
		chatId: '',
	},
	key: 'messageModalAtom',
});
