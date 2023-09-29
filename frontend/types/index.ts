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

export { EditMode };

export type { Union };
