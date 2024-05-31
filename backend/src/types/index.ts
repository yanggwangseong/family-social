/**
 * enum type 대신 union type
 * @name Union
 * @example
 * const a = ['a','b'] as const;
 * const b = { a:'a', b: 'b'} as const;
 * Union<typeof a>	// 'a' | 'b'
 * Union<typeof b>	// 'a' | 'b'
 *
 */
export type Union<
	T extends { [k: string]: ValueType } | ReadonlyArray<ValueType>,
> = T extends ReadonlyArray<ValueType>
	? T[number]
	: T extends { [k: string]: infer U }
	? U
	: never;

type ValueType = string | number | boolean;

export const AlarmType = ['comment_on_my_post', 'like_on_my_post'] as const;
export const MentionType = ['mention_on_feed', 'mention_on_comment'] as const;
export const isReadOptions = ['ALL', 'READ', 'NOTREAD'] as const;
export const isFeedOptions = ['TOP', 'MYFEED', 'ALL', 'GROUPFEED'] as const;
export const OrderOptions = ['ASC', 'DESC'] as const;
