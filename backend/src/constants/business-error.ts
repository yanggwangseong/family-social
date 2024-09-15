export const ERROR_USER_NOT_FOUND = '유저를 찾을 수 없습니다' as const;

export const ERROR_EMAIL_NOT_FOUND =
	'이메일에 해당하는 유저를 찾을 수 없습니다' as const;

export const ERROR_USER_ALREADY_EXISTS =
	'이미 해당 이메일에 해당하는 유저가 존재합니다' as const;

export const ERROR_EMAIL_VERIFY_CODE_EXISTS =
	'이메일 검증 코드가 일치 하지 않습니다' as const;

export const ERROR_PASSWORD_MISMATCH = '비밀번호가 일치하지 않습니다' as const;

export const ERROR_TOKEN_MISMATCH = '토큰 정보가 일치하지 않습니다' as const;

export const ERROR_AUTHORIZATION_MEMBER =
	'멤버에 대한 권한이 없습니다.' as const;

export const ERROR_DELETE_GROUP_MEMBER =
	'그룹멤버를 삭제하던 도중 에러가 발생했습니다' as const;

export const ERROR_INVITED_GROUP_NOT_FOUND =
	'초대 받은 그룹을 찾을 수 없습니다' as const;

export const ERROR_NO_PERMISSION_TO_DELETE_GROUP =
	'그룹을 삭제 할 권한이 없습니다' as const;

export const ERROR_NO_PERMISSTION_TO_GROUP =
	'그룹에 접근 할 권한이 없습니다.' as const;

export const ERROR_DELETE_GROUP_SELF_ONLY_ADMIN =
	'그룹 삭제시 그룹에 관리자 본인만 있을 때 가능 합니다' as const;

export const ERROR_DELETE_GROUP =
	'그룹을 삭제하던 도중 에러가 발생했습니다' as const;

export const ERROR_DUPLICATE_GROUP_NAME =
	'중복된 그룹 이름을 이미 가지고 있습니다' as const;

export const ERROR_GROUP_NOT_FOUND = '그룹을 찾을 수 없습니다' as const;

export const ERROR_GROUP_MEMBER_NOT_FOUND =
	'해당 그룹에 존재하지 않은 멤버 입니다' as const;

export const ERROR_INVITED_MEMBER_NOT_FOUND =
	'초대받은 멤버와 다른 사용자 입니다' as const;

export const ERROR_CANNOT_INVITE_SELF =
	'자기 자신을 초대할 수 없습니다' as const;

export const ERROR_DELETE_FEED_OR_MEDIA =
	'미디어 또는 피드를 삭제하는 도중 에러가 발생했습니다' as const;

export const ERROR_FILE_DIR_NOT_FOUND = '파일 경로를 찾을 수 없습니다' as const;

export const ERROR_FEED_NOT_FOUND = '피드를 찾을 수 없습니다' as const;

export const ERROR_NO_PERMISSTION_TO_FEED =
	'해당 피드에 접근 할 권한이 없습니다' as const;

export const ERROR_COMMENT_NOT_FOUND = '댓글을 찾을 수 없습니다' as const;

export const ERROR_DELETE_COMMENT =
	'댓글을 삭제하는 도중 에러가 발생했습니다' as const;

export const ERROR_NO_PERMISSTION_TO_COMMENT =
	'해당 댓글에 접근 할 권한이 없습니다' as const;

export const ERROR_NO_PERMISSTION_TO_SCHEDULE =
	'여행 일정에 접근 할 권한이 없습니다' as const;

export const ERROR_SCHEDULE_NOT_FOUND = '여행 일정을 찾을 수 없습니다' as const;

export const ERROR_CHAT_NOT_FOUND = '존재하지 않는 chat 입니다' as const;

export const ERROR_TOKEN_EXPIRED = '토큰이 만료되었습니다' as const;
export const ERROR_INVALID_TOKEN = '토큰이 유효하지 않습니다' as const;

//pipe-message
export const ERROR_UUID_PIPE_MESSAGE = 'uuid형식이 올바르지 않습니다' as const;
export const ERROR_INT_PIPE_MESSAGE = 'number형식이 올바르지 않습니다' as const;
export const ERROR_BOOLEAN_PIPE_MESSAGE =
	'boolean형식이 올바르지 않습니다' as const;

export const ERROR_EMAIL_PIPE_MESSAGE =
	'이메일 형식이 올바르지 않습니다' as const;
export const ERROR_IS_READ_OPTIONS_PIPE_MESSAGE =
	'options의 값이 올바르지 않습니다' as const;

// medias
export const ERROR_FILE_NOT_FOUND = '파일이 없습니다' as const;

// 500 InternalServerErrorException
export const ERROR_INTERNAL_SERVER_ERROR =
	'서버에 오류가 발생하여 요청을 수행할 수 없습니다' as const;

// pagination error
export const ERROR_PARSER_FILTER_WHERE =
	`where 필터는 '__'로 split 했을때 길이가 2 또는 3이어야합니다` as const;

export const ERROR_PARSER_FILTER_ORDER =
	`order 필터는 '__'로 split 했을때 길이가 2여야 합니다` as const;

// group-event
export const ERROR_GROUP_EVENT_NOT_FOUND =
	'해당 그룹 이벤트를 찾을 수 없습니다' as const;

export const ERROR_GROUP_EVENT_TYPE_NOT_FOUND =
	'해당 그룹 이벤트 타입을 찾을 수 없습니다' as const;

export const ERROR_DELETE_GROUP_EVENT =
	'해당 그룹 이벤트를 삭제하던 도중 에러가 발생했습니다' as const;

export const ERROR_NO_PERMISSTION_TO_GROUP_EVENT =
	'해당 그룹 이벤트에 접근 할 권한이 없습니다' as const;

// invite-link
export const ERROR_INVITE_LINK_EXPIRED = '해당 링크가 만료 되었습니다' as const;
export const ERROR_INVITE_USES_LIMIT =
	'해당 링크 초대 횟수를 초과 하였습니다' as const;

// search
export const ERROR_SEARCH_TYPE_PIPE_MESSAGE =
	'searchType값이 올바르지 않습니다' as const;
