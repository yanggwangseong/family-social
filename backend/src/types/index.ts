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

/**
 * 보다 정확한 type추론을 위한 OmitStrict
 * @name OmitStrict
 * @example K를 제외한 T값
 */
export type OmitStrict<T, K extends keyof T> = T extends any
	? Pick<T, Exclude<keyof T, K>>
	: never;

/**
 * 특정 프로퍼티만 옵셔널로 지정해서 다 가져온다.
 */
export type PartialPick<T, K extends keyof T> = {
	[P in Exclude<keyof T, K>]: T[P];
} & {
	[P in K]?: T[P];
};

export const AlarmType = ['comment_on_my_post', 'like_on_my_post'] as const;
export const MentionType = ['mention_on_feed', 'mention_on_comment'] as const;
export const isReadOptions = ['ALL', 'READ', 'NOTREAD'] as const;
export const isFeedOptions = ['TOP', 'MYFEED', 'ALL', 'GROUPFEED'] as const;
export const isScheduleOptins = [
	'SCHEDULEALL',
	'MYSCHEDULE',
	'SHAREDSCHEDULE',
] as const;
export const OrderOptions = ['ASC', 'DESC'] as const;
export const EventType = ['BIRTHDAY', 'SIXTIETHBIRTHDAY'] as const;
export const ChatType = ['GROUP', 'DIRECT'] as const;
export const contentTypeId = [
	'12',
	'14',
	'15',
	'25',
	'28',
	'32',
	'38',
	'39',
] as const;

export const TourArrange = ['A', 'C', 'D', 'O', 'Q', 'R'] as const;

export const SearchType = ['tour', 'member'] as const;

export const LikeCacheType = ['feed', 'comment'] as const;
