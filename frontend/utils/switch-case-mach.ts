interface MatchType<X, Y> {
	on: (pred: (x: X) => boolean, fn: (x: X) => Y) => MatchType<X, Y>;
	otherwise: (fn: (x: X) => Y) => Y;
}

const matched = <X>(x: X) => {
	return {
		on: () => matched(x),
		otherwise: () => x,
	};
};

export const switchCaseMach = <X, Y>(x: X): MatchType<X, Y> => {
	return {
		on: (pred: (x: X) => boolean, fn: (x: X) => Y) =>
			pred(x) ? matched(fn(x)) : switchCaseMach(x),
		otherwise: (fn: (x: X) => Y) => fn(x),
	};
};

/**
 * example
 * 흠.. 타입 narrowing이 안되네
 * 타입 narrowing이 어떻게 보면 switch case문을 사용하는 이유기도 한데
 * 이러면 switch case문을 대체 할 수 가 없다.
 */
// const param = '1';
// const example = switchCaseMach<'1' | '2' | '3', '1' | '2' | '3'>(param)
// 	.on(
// 		x => x === '1',
// 		() => '1',
// 	)
// 	.on(
// 		x => x === '1',
// 		() => '1',
// 	);
