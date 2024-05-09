import Link from 'next/link';
import React, { FC } from 'react';

const MentionView: FC<{ contents: string }> = ({ contents }) => {
	const renderMentions = (text: string) => {
		const regex = /@\[([^\]]+)\]\(([^)]+)\)/g;
		const parts = text.split(regex);
		const parts2 = text.match(regex);
		console.log(parts2);
		// const result = text.replaceAll(regex, (sub, argument) => {
		// 	const parts = sub.split(regex);

		// 	return parts.map((part, index) => {
		// 		return (
		// 			<Link key={index} href={`/accounts/${argument}`}>
		// 				{`@${name}`}
		// 			</Link>
		// 		);
		// 	});
		// });

		// console.log(result);

		// return result;

		// console.log(parts);
		return parts.map((part, index) => {
			if (index % 3 === 1) {
				const name = parts[index];
				const id = parts[index + 1];
				return (
					<Link key={index} href={`/accounts/${id}`}>
						{`@${name}`}
					</Link>
				);
			} else {
				const id = parts[index];
				console.log('****id=', id);
				return part;
			}
		});
	};

	return <div>{renderMentions(contents)}</div>;
};

export default MentionView;
