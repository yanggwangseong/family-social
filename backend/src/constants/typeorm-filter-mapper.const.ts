import {
	Between,
	Equal,
	ILike,
	In,
	IsNull,
	LessThan,
	LessThanOrEqual,
	Like,
	MoreThan,
	MoreThanOrEqual,
	Not,
} from 'typeorm';

export const TYPEORM_FILTER_MAPPER = {
	not: Not,
	less_than: LessThan,
	lessthan_or_equal: LessThanOrEqual,
	more_than: MoreThan,
	more_than_or_equal: MoreThanOrEqual,
	equal: Equal,
	like: Like,
	i_like: ILike,
	between: Between,
	in: In,
	is_null: IsNull,
};

// __ 기준으로 split되고 __는 2~3개만 올 수 있다.
// where__id__more_than
// where__#{propertykey}__more_than
