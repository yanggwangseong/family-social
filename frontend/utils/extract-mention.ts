import { CreateMentionRequest } from '@/components/ui/form/comment-form.interface';
import { MENTION_MATCH_PATTERN } from '@/constants/mention-match-pattern.const';

export const extractMention = (contents: string) => {
	const matches: CreateMentionRequest[] = [];

	let match;
	let i = 0;
	while ((match = MENTION_MATCH_PATTERN.exec(contents)) !== null) {
		matches.push({
			mentionMemberId: match[2],
			mentionPosition: i++,
		});
	}

	return matches;
};
