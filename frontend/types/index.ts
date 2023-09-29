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
type ValueType = string | number | boolean;

type Union<T extends { [k: string]: ValueType } | ReadonlyArray<ValueType>> =
	T extends ReadonlyArray<ValueType>
		? T[number]
		: T extends { [k: string]: infer U }
		? U
		: never;

const EditMode = ['information', 'visitMessage', 'reset', ''] as const;
//type EditModeType = (typeof EditMode)[keyof typeof EditMode];

/**
 * 보다 정확한 type추론을 위한 OmitStrict
 * @name OmitStrict
 * @example K를 제외한 T값
 */
type OmitStrict<T, K extends keyof T> = T extends any
	? Pick<T, Exclude<keyof T, K>>
	: never;

export { EditMode };

export type { Union, OmitStrict };
