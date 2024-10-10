import Link from 'next/link';
import React, { FC, useState } from 'react';
import style from '../MentionField.module.scss';
import { MENTION_MATCH_PATTERN } from '@/constants/mention-match-pattern.const';
import { MentionsResponse } from '@/shared/interfaces/mention.interface';
import { AnimatePresence, motion } from 'framer-motion';
import MemberHoverModal from '../../modal/member-hover-modal/MemberHoverModal';
import { useHover } from '@/hooks/useHover';

const MentionView: FC<{ contents: string; mentions: MentionsResponse[] }> = ({
	contents,
	mentions,
}) => {
	const { handleMouseOver, handleMouseOut, isHovering } = useHover();

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
						onMouseOver={() => handleMouseOver(index)}
						onMouseOut={() => handleMouseOut()}
						key={index}
						href={`/accounts/${existsMention.mentionRecipient.email}`}
					>
						{`@${name}`}
						{isHovering === index && (
							<AnimatePresence key={index}>
								<motion.div
									key={index}
									className={style.mention_view_modal}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
									exit={{ opacity: 0, transition: { duration: 1 } }}
								>
									<MemberHoverModal
										mentionRecipient={existsMention.mentionRecipient}
									></MemberHoverModal>
								</motion.div>
							</AnimatePresence>
						)}
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
