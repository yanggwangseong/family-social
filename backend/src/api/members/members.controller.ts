import {
	Body,
	Controller,
	Param,
	ParseUUIDPipe,
	Post,
	Put,
	UploadedFiles,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { MemberUpdateReqDto } from '@/models/dto/member/req/member-update-req.dto';
import { CurrentUser } from '@/common/decorators/user.decorator';
import {
	BadRequestServiceException,
	UnAuthOrizedException,
} from '@/common/exception/service.exception';
import { ERROR_AUTHORIZATION_MEMBER } from '@/constants/business-error';
import { AccessTokenGuard } from '@/common/guards/accessToken.guard';
import { UpdateMemberProfileSwagger } from '@/common/decorators/swagger/swagger-member.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateMemberProfileImageMulterOptions } from '@/utils/upload-media';

@UseInterceptors(LoggingInterceptor, TimeoutInterceptor)
@UseGuards(AccessTokenGuard)
@ApiTags('members')
@Controller('members')
export class MembersController {
	constructor(private readonly membersService: MembersService) {}

	/**
	 * @summary 계정 정보 수정 api 추가
	 *
	 * @tag members
	 * @param {string} memberId   		- 수정 할 memberId
	 * @param {string} dto.username   	- 유저이름
	 * @param {string} dto.phoneNumber  - 휴대폰 번호
	 * @param {string} dto.profileImage - 프로필 이미지 url
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns void
	 */
	@UpdateMemberProfileSwagger()
	@Put(':memberId')
	async updateMemberProfile(
		@Body() dto: MemberUpdateReqDto,
		@Param('memberId', ParseUUIDPipe) memberId: string,
		@CurrentUser('sub') sub: string,
	) {
		if (sub !== memberId)
			throw UnAuthOrizedException(ERROR_AUTHORIZATION_MEMBER);

		return await this.membersService.updateMemberProfile({
			memberId,
			username: dto.username,
			phoneNumber: dto.phoneNumber,
			profileImage: dto.profileImage,
		});
	}

	@Post('/uploads/profile')
	@UseInterceptors(
		FilesInterceptor('files', 1, CreateMemberProfileImageMulterOptions()),
	)
	@ApiConsumes('multipart/form-data')
	async upload(@UploadedFiles() files: Express.MulterS3.File[]) {
		if (!files?.length) {
			throw BadRequestServiceException(`파일이 없습니다.`);
		}
		const locations = files.map(({ location }) => location);
		return locations;
	}
}
