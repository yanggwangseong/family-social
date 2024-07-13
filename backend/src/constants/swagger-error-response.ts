import {
	BadRequestServiceException,
	EntityConflictException,
	EntityNotFoundException,
	ForBiddenException,
	UnAuthOrizedException,
	UnProcessAbleException,
} from '@/common/exception/service.exception';

import {
	ERROR_AUTHORIZATION_MEMBER,
	ERROR_CANNOT_INVITE_SELF,
	ERROR_COMMENT_NOT_FOUND,
	ERROR_DELETE_COMMENT,
	ERROR_DELETE_FEED_OR_MEDIA,
	ERROR_DELETE_GROUP,
	ERROR_DELETE_GROUP_MEMBER,
	ERROR_DELETE_GROUP_SELF_ONLY_ADMIN,
	ERROR_DUPLICATE_GROUP_NAME,
	ERROR_EMAIL_NOT_FOUND,
	ERROR_EMAIL_VERIFY_CODE_EXISTS,
	ERROR_FEED_NOT_FOUND,
	ERROR_FILE_DIR_NOT_FOUND,
	ERROR_GROUP_EVENT_TYPE_NOT_FOUND,
	ERROR_GROUP_NOT_FOUND,
	ERROR_INVITED_GROUP_NOT_FOUND,
	ERROR_INVITED_MEMBER_NOT_FOUND,
	ERROR_NO_PERMISSION_TO_DELETE_GROUP,
	ERROR_NO_PERMISSTION_TO_FEED,
	ERROR_NO_PERMISSTION_TO_GROUP,
	ERROR_NO_PERMISSTION_TO_GROUP_EVENT,
	ERROR_PASSWORD_MISMATCH,
	ERROR_USER_ALREADY_EXISTS,
	ERROR_USER_NOT_FOUND,
	ERROR_UUID_PIPE_MESSAGE,
} from './business-error';

// validation 에러
export const BadRequestErrorResponse = {
	// 400
	'BadRequest-400-1': {
		model: BadRequestServiceException,
		exampleDescription: 'uuid 형식이 올바르지 않을때 발생하는 에러입니다',
		exampleTitle: `${ERROR_UUID_PIPE_MESSAGE}`,
		message: `${ERROR_UUID_PIPE_MESSAGE}`,
	},
};

// 멤버
export const MemberErrorResponse = {
	// 401
	'Member-401-1': {
		model: UnAuthOrizedException,
		exampleDescription: '비밀번호가 일치 하지 않았을떄 발생하는 에러 입니다',
		exampleTitle: `${ERROR_PASSWORD_MISMATCH}`,
		message: `${ERROR_PASSWORD_MISMATCH}`,
	},
	'Member-401-2': {
		model: UnAuthOrizedException,
		exampleDescription: '해당 멤버에 대한 권한이 없을 때 발생하는 에러 입니다',
		exampleTitle: `${ERROR_AUTHORIZATION_MEMBER}`,
		message: `${ERROR_AUTHORIZATION_MEMBER}`,
	},

	// 404
	'Member-404-1': {
		model: EntityNotFoundException,
		exampleDescription: '해당하는 유저가 존재하지 않을때 발생하는 에러 입니다',
		exampleTitle: `${ERROR_USER_NOT_FOUND}`,
		message: `${ERROR_USER_NOT_FOUND}`,
	},
	'Member-404-2': {
		model: EntityNotFoundException,
		exampleDescription:
			'이메일에 해당하는 유저가 존재하지 않을때 발생하는 에러 입니다',
		exampleTitle: `${ERROR_EMAIL_NOT_FOUND}`,
		message: `${ERROR_EMAIL_NOT_FOUND}`,
	},

	//409
	'Member-409-1': {
		model: EntityConflictException,
		exampleDescription:
			'이미 해당 이메일에 해당하는 유저가 존재 할 때 발생하는 에러 입니다',
		exampleTitle: `${ERROR_USER_ALREADY_EXISTS}`,
		message: `${ERROR_USER_ALREADY_EXISTS}`,
	},

	// 422
	'Member-422-1': {
		model: UnProcessAbleException,
		exampleDescription:
			'이메일 검증 코드가 일치 하지 않을때 발생하는 에러 입니다',
		exampleTitle: `${ERROR_EMAIL_VERIFY_CODE_EXISTS}`,
		message: `${ERROR_EMAIL_VERIFY_CODE_EXISTS}`,
	},
};

// 그룹 이벤트
export const GroupEventErrorResponse = {
	// 404
	'GroupEvent-404-1': {
		model: EntityNotFoundException,
		exampleDescription:
			'해당하는 그룹 이벤트가 존재하지 않을때 발생하는 에러 입니다',
		exampleTitle: `${ERROR_GROUP_EVENT_TYPE_NOT_FOUND}`,
		message: `${ERROR_GROUP_EVENT_TYPE_NOT_FOUND}`,
	},
	//403
	'GroupEvent-403-1': {
		model: ForBiddenException,
		exampleDescription:
			'해당 그룹 이벤트에 접근 권한이 없을때 발생하는 에러 입니다',
		exampleTitle: `${ERROR_NO_PERMISSTION_TO_GROUP_EVENT}`,
		message: `${ERROR_NO_PERMISSTION_TO_GROUP_EVENT}`,
	},
};

// 그룹
export const GroupErrorResponse = {
	// 400
	'Group-400-1': {
		model: BadRequestServiceException,
		exampleDescription: '그룹에 자기 자신을 초대 했을때 발생하는 에러 입니다',
		exampleTitle: `${ERROR_CANNOT_INVITE_SELF}`,
		message: `${ERROR_CANNOT_INVITE_SELF}`,
	},
	'Group-400-2': {
		model: BadRequestServiceException,
		exampleDescription: '초대받은 멤버와 다를 경우 발생하는 에러 입니다',
		exampleTitle: `${ERROR_INVITED_MEMBER_NOT_FOUND}`,
		message: `${ERROR_INVITED_MEMBER_NOT_FOUND}`,
	},

	// 404
	'Group-404-1': {
		model: EntityNotFoundException,
		exampleDescription: '해당하는 그룹이 존재하지 않을때 발생하는 에러 입니다',
		exampleTitle: `${ERROR_GROUP_NOT_FOUND}`,
		message: `${ERROR_GROUP_NOT_FOUND}`,
	},
	'Group-404-2': {
		model: EntityNotFoundException,
		exampleDescription: '초대 받은 그룹을 찾을 수 않을때 발생하는 에러 입니다',
		exampleTitle: `${ERROR_INVITED_GROUP_NOT_FOUND}`,
		message: `${ERROR_INVITED_GROUP_NOT_FOUND}`,
	},

	// 403
	'Group-403-1': {
		model: ForBiddenException,
		exampleDescription: '해당 그룹에 접근 권한이 없을때 발생하는 에러 입니다',
		exampleTitle: `${ERROR_NO_PERMISSTION_TO_GROUP}`,
		message: `${ERROR_NO_PERMISSTION_TO_GROUP}`,
	},
	'Group-403-2': {
		model: ForBiddenException,
		exampleDescription:
			'해당 그룹에 그룹을 삭제 할 권한이 없을때 발생하는 에러 입니다',
		exampleTitle: `${ERROR_NO_PERMISSION_TO_DELETE_GROUP}`,
		message: `${ERROR_NO_PERMISSION_TO_DELETE_GROUP}`,
	},
	'Group-403-3': {
		model: ForBiddenException,
		exampleDescription:
			'해당 그룹에 관리자 본인 1명외 멤버가 있을때 발생하는 에러 입니다',
		exampleTitle: `${ERROR_DELETE_GROUP_SELF_ONLY_ADMIN}`,
		message: `${ERROR_DELETE_GROUP_SELF_ONLY_ADMIN}`,
	},

	//409
	'Group-409-1': {
		model: EntityConflictException,
		exampleDescription:
			'중복된 그룹 이름을 생성 하려고 할때 발생하는 에러 입니다',
		exampleTitle: `${ERROR_DUPLICATE_GROUP_NAME}`,
		message: `${ERROR_DUPLICATE_GROUP_NAME}`,
	},
	'Group-409-2': {
		model: EntityConflictException,
		exampleDescription: '그룹을 삭제중 에러가 발생하는 에러 입니다',
		exampleTitle: `${ERROR_DELETE_GROUP}`,
		message: `${ERROR_DELETE_GROUP}`,
	},
	'Group-409-3': {
		model: EntityConflictException,
		exampleDescription: '그룹멤버를 삭제중 에러가 발생하는 에러 입니다',
		exampleTitle: `${ERROR_DELETE_GROUP_MEMBER}`,
		message: `${ERROR_DELETE_GROUP_MEMBER}`,
	},
};

// 댓글
export const CommentErrorResponse = {
	// 404
	'Comment-404-1': {
		model: EntityNotFoundException,
		exampleDescription: '해당하는 댓글이 존재하지 않을때 발생하는 에러 입니다',
		exampleTitle: `${ERROR_COMMENT_NOT_FOUND}`,
		message: `${ERROR_COMMENT_NOT_FOUND}`,
	},
	//409
	'Comment-409-1': {
		model: EntityConflictException,
		exampleDescription: '댓글을 삭제중 에러가 발생하는 에러 입니다',
		exampleTitle: `${ERROR_DELETE_COMMENT}`,
		message: `${ERROR_DELETE_COMMENT}`,
	},
};

// 피드
export const FeedErrorResponse = {
	// 403
	'Feed-403-1': {
		model: ForBiddenException,
		exampleDescription: '해당 피드에 접근 권한이 없을때 발생하는 에러 입니다',
		exampleTitle: `${ERROR_NO_PERMISSTION_TO_FEED}`,
		message: `${ERROR_NO_PERMISSTION_TO_FEED}`,
	},
	// 404
	'Feed-404-1': {
		model: EntityNotFoundException,
		exampleDescription: '해당하는 피드가 존재하지 않을때 발생하는 에러 입니다',
		exampleTitle: `${ERROR_FEED_NOT_FOUND}`,
		message: `${ERROR_FEED_NOT_FOUND}`,
	},
	'Feed-404-2': {
		model: EntityNotFoundException,
		exampleDescription:
			'해당하는 피드의 미디어 파일의 경로를 찾을 수 없을때 발생하는 에러 입니다',
		exampleTitle: `${ERROR_FILE_DIR_NOT_FOUND}`,
		message: `${ERROR_FILE_DIR_NOT_FOUND}`,
	},
	//409
	'Feed-409-1': {
		model: EntityConflictException,
		exampleDescription:
			'피드와 피드 미디어를 삭제중 에러가 발생하는 에러 입니다',
		exampleTitle: `${ERROR_DELETE_FEED_OR_MEDIA}`,
		message: `${ERROR_DELETE_FEED_OR_MEDIA}`,
	},
};
