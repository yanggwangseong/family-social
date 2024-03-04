import { MessageItemResponse } from '@/shared/interfaces/message.interface';

export interface MessageBoxProps {
	isMine: boolean;
	message: MessageItemResponse;
}
