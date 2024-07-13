import {
	BadRequestServiceException,
	EntityConflictException,
	EntityNotFoundException,
	ForBiddenException,
} from '@/common/exception/service.exception';

import {
	ERROR_COMMENT_NOT_FOUND,
	ERROR_DELETE_COMMENT,
	ERROR_DELETE_FEED_OR_MEDIA,
	ERROR_FEED_NOT_FOUND,
	ERROR_FILE_DIR_NOT_FOUND,
	ERROR_NO_PERMISSTION_TO_FEED,
	ERROR_UUID_PIPE_MESSAGE,
} from './business-error';

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
	// 400
	'Feed-400-1': {
		model: BadRequestServiceException,
		exampleDescription: '피드 ID값이 uuid 형식이 아닐때 발생하는 에러 입니다',
		exampleTitle: `${ERROR_UUID_PIPE_MESSAGE}`,
		message: `${ERROR_UUID_PIPE_MESSAGE}`,
	},
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
