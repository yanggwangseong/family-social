// 12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점
export const ContentTypeId = [
	'12',
	'14',
	'15',
	'25',
	'28',
	'32',
	'38',
	'39',
] as const;

export const ContentTypeName = {
	'12': '관광지',
	'14': '문화시설',
	'15': '축제공연행사',
	'25': '여행코스',
	'28': '레포츠',
	'32': '숙박',
	'38': '쇼핑',
	'39': '음식점',
} as const;