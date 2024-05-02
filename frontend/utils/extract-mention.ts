import { CreateMentionRequest } from '@/components/ui/form/comment-form.interface';

export const extractMention = (contents: string) => {
	const regex = /@\[([^\]]+)\]\(([^)]+)\)/g;
	const matches: CreateMentionRequest[] = [];

	let match;
	let i = 0;
	while ((match = regex.exec(contents)) !== null) {
		matches.push({
			mentionMemberId: match[2],
			mentionPosition: i++,
		});
	}

	return matches;
};
