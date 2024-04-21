//type EditModeType = (typeof EditMode)[keyof typeof EditMode];
export const EditMode = ['information', 'visitMessage', 'reset'] as const;
export const LayerMode = {
	linkInvite: 'linkInvite',
	emailInvite: 'emailInvite',
	groupDeleteConfirm: 'groupDeleteConfirm',
	createFeed: 'createFeed',
	feedDeleteConfirm: 'feedDeleteConfirm',
	commentDeleteConfirm: 'commentDeleteConfirm',
	logoutConfirm: 'logoutConfirm',
	editProfile: 'editProfile',
	selectedContentType: 'selectedContentType',
	serviceCategory: 'serviceCategory',
	areaCode: 'areaCode',
	tourismDetail: 'tourismDetail',
	scheduleDeleteConfirm: 'scheduleDeleteConfirm',
	scheduleThumbnailImage: 'scheduleThumbnailImage',
} as const;

export const ToggleModalDerection = ['left', 'right'] as const;
export const feedPublicSelectOptions = ['public', 'private'] as const;
export const rightSideTabMenus = ['members', 'groups', 'favorites'] as const;
export const selectedProfileType = ['social', 'basic'] as const;
export const TabMenus = [
	'TOP',
	'MYFEED',
	'ALL',
	'SCHEDULEALL',
	'MYSCHEDULE',
	'SHAREDSCHEDULE',
	'TOURCONTENTTYPE',
	'TOURSEARCH',
	'FESTIVAL',
	'NOTREAD',
	'READ',
] as const;
export const schdulePages = [
	'selectGroupPage',
	'periodPage',
	'tourismPage',
] as const;
export const isReadOptions = ['ALL', 'READ', 'NOTREAD'] as const;

/**
 * 보다 정확한 type추론을 위한 OmitStrict
 * @name OmitStrict
 * @example K를 제외한 T값
 */
export type OmitStrict<T, K extends keyof T> = T extends any
	? Pick<T, Exclude<keyof T, K>>
	: never;

/**
 * reverse 배열을 추론하는 타입
 * @name Reverse
 * @example
 * type OriginalArray = [1,2,3,4,5];
 * type ReversedArray = Reverse<OriginalArray>;
 * 추론 값 : type ReversedArray = [5, 4, 3, 2, 1]
 *
 */
export type Reverse<T extends any[]> = T extends [infer F, ...infer Rest]
	? [...Reverse<Rest>, F]
	: [];

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

type NumericRange<
	START extends number,
	END extends number,
	ARR extends unknown[] = [],
	ACC extends number = never,
> = ARR['length'] extends END
	? ACC | START | END
	: NumericRange<
			START,
			END,
			[...ARR, 1],
			ARR[START] extends undefined ? ACC : ACC | ARR['length']
	  >;

type PaginateLimit = NumericRange<3, 10, []>;
