export const ERROR_USER_NOT_FOUND = '유저를 찾을 수 없습니다' as const;

export const ERROR_EMAIL_NOT_FOUND =
	'이메일에 해당하는 유저를 찾을 수 없습니다' as const;

export const ERROR_USER_ALREADY_EXISTS =
	'이미 해당 이메일에 해당하는 유저가 존재합니다' as const;

export const ERROR_EMAIL_VERIFY_CODE_EXISTS =
	'이메일 검증 코드가 일치 하지 않습니다' as const;

export const ERROR_PASSWORD_MISMATCH = '비밀번호가 일치하지 않습니다' as const;

export const ERROR_TOKEN_MISMATCH = '토큰 정보가 일치하지 않습니다' as const;

export const ERROR_DELETE_GROUP_MEMBER =
	'그룹멤버를 삭제하던 도중 에러가 발생했습니다' as const;

export const ERROR_INVITED_GROUP_NOT_FOUND =
	'초대 받은 그룹을 찾을 수 없습니다' as const;

export const ERROR_NO_PERMISSION_TO_DELETE_GROUP =
	'그룹을 삭제 할 권한이 없습니다';

export const ERROR_DELETE_GROUP_SELF_ONLY_ADMIN =
	'그룹 삭제시 그룹에 관리자 본인만 있을 때 가능 합니다';

export const ERROR_DELETE_GROUP =
	'그룹을 삭제하던 도중 에러가 발생했습니다' as const;

export const ERROR_DUPLICATE_GROUP_NAME =
	'중복된 그룹 이름을 이미 가지고 있습니다' as const;

export const ERROR_GROUP_NOT_FOUND = '그룹을 찾을 수 없습니다' as const;

export const ERROR_INVITED_MEMBER_NOT_FOUND =
	'초대받은 멤버와 다른 사용자 입니다' as const;

export const ERROR_CANNOT_INVITE_SELF =
	'자기 자신을 초대할 수 없습니다' as const;