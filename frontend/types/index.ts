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
type Union<T extends { [k: string]: ValueType } | ReadonlyArray<ValueType>> =
	T extends ReadonlyArray<ValueType>
		? T[number]
		: T extends { [k: string]: infer U }
		? U
		: never;

type ValueType = string | number | boolean;

//type EditModeType = (typeof EditMode)[keyof typeof EditMode];
const EditMode = ['information', 'visitMessage', 'reset', ''] as const;
const LayerMode = {
	linkInvite: 'linkInvite',
	emailInvite: 'emailInvite',
	groupDeleteConfirm: 'groupDeleteConfirm',
	createFeed: 'createFeed',
	feedDeleteConfirm: 'feedDeleteConfirm',
	commentDeleteConfirm: 'commentDeleteConfirm',
	logoutConfirm: 'logoutConfirm',
	editProfile: 'editProfile',
} as const;

const ToggleModalDerection = ['left', 'right'] as const;
const feedPublicSelectOptions = ['public', 'private'] as const;
const rightSideTabMenus = ['members', 'groups', 'favorites'] as const;
/**
 * 보다 정확한 type추론을 위한 OmitStrict
 * @name OmitStrict
 * @example K를 제외한 T값
 */
type OmitStrict<T, K extends keyof T> = T extends any
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
type Reverse<T extends any[]> = T extends [infer F, ...infer Rest]
	? [...Reverse<Rest>, F]
	: [];

export {
	EditMode,
	LayerMode,
	ToggleModalDerection,
	feedPublicSelectOptions,
	rightSideTabMenus,
};
export type { Union, OmitStrict, Reverse };
