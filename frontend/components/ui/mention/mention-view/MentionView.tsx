import Link from 'next/link';
import React, { FC } from 'react';
import style from '../MentionField.module.scss';
import { MENTION_MATCH_PATTERN } from '@/constants/mention-match-pattern.const';
import { MentionsResponse } from '@/shared/interfaces/mention.interface';

const MentionView: FC<{ contents: string; mentions: MentionsResponse[] }> = ({
	contents,
	mentions,
}) => {
	const renderMentions = (text: string) => {
		const parts = text.split(MENTION_MATCH_PATTERN);

		return parts.map((part, index) => {
			if (index % 3 === 1) {
				const name = parts[index];
				const id = parts[index + 1];

				const existsMention = mentions.find(
					data => data.mentionRecipient.id === id,
				);

				if (!existsMention) return `@${name}`;

				return (
					<Link
						className={style.mentions__mention}
						key={index}
						href={`/accounts/${existsMention.mentionRecipient.email}`}
					>
						{`@${name}`}
					</Link>
				);
			} else if (index % 3 === 2) {
				return '';
			} else {
				const id = parts[index];

				return part;
			}
		});
	};

	return <div>{renderMentions(contents)}</div>;
};

export default MentionView;
