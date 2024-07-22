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
