import { EmojiClickData } from 'emoji-picker-react';
import { useState } from 'react';
import {
	UseFormGetValues,
	UseFormSetValue,
	FieldValues,
	FieldPath,
	PathValue,
} from 'react-hook-form';

export const useEmoji = <T extends FieldValues>(
	getValues: UseFormGetValues<T>,
	setValue: UseFormSetValue<T>,
) => {
	const [isEmoji, setIsEmoji] = useState<boolean>(false);

	const handleEmojiView = () => {
		setIsEmoji(!isEmoji);
	};

	const handlesetValueAddEmoji = (
		emojiData: EmojiClickData,
		valueKey: FieldPath<T>,
	) => {
		const currentComment = (getValues(valueKey) + emojiData.emoji) as PathValue<
			T,
			FieldPath<T>
		>; // 현재 입력된 댓글과 emoji를 합쳐줌.

		setValue(valueKey, currentComment);
		handleEmojiView();
	};

	return {
		isEmoji,
		setIsEmoji,
		handleEmojiView,
		handlesetValueAddEmoji,
	};
};
