import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import {
	EntityNotFoundException,
	ForBiddenException,
} from '@/common/exception/service.exception';
import { Pagination } from '@/common/strategies/context/pagination';
import {
	ERROR_NO_PERMISSTION_TO_SCHEDULE,
	ERROR_SCHEDULE_NOT_FOUND,
} from '@/constants/business-error';
import { SchedulePaginationReqDto } from '@/models/dto/schedule/req/schedule-pagination-req.dto';
import { TourismCreateReqDto } from '@/models/dto/schedule/req/tourism-create-req.dto';
import { TourismPeriodCreateReqDto } from '@/models/dto/schedule/req/tourism-period-create-req.dto';
import { ScheduleByIdResDto } from '@/models/dto/schedule/res/schedule-by-id-res.dto';
import { ScheduleGetListResDto } from '@/models/dto/schedule/res/schedule-get-list-res.dto';
import { ScheduleResDto } from '@/models/dto/schedule/res/schedule-res.dto';
import { ScheduleEntity } from '@/models/entities/schedule.entity';
import { SharedScheduleMemberEntity } from '@/models/entities/shared-schedule-member.entity';
import { TourismPeriodEntity } from '@/models/entities/tourism-period.entity';
import { TourismEntity } from '@/models/entities/tourism.entity';
import { ScheduleRepository } from '@/models/repositories/schedule.repository';
import { SharedScheduleMemberRepository } from '@/models/repositories/shared-schedule-member.repository';
import { TourismPeriodRepository } from '@/models/repositories/tourism-period.repository';
import { TourismRepository } from '@/models/repositories/tourism.repository';
import { isScheduleOptins, Union } from '@/types';
import { ICreateTourArgs, IUpdateTourArgs } from '@/types/args/tour';
import { BasicPaginationResponse } from '@/types/pagination';
import { OverrideInsertFeild } from '@/types/repository';
import { getOffset } from '@/utils/getOffset';

@Injectable()
export class SchedulesService {
	constructor(
		private readonly scheduleRepository: ScheduleRepository,
		private readonly tourismPeriodRepository: TourismPeriodRepository,
		private readonly tourismRepository: TourismRepository,
		private readonly sharedScheduleMemberRepository: SharedScheduleMemberRepository,
	) {}

	async getScheduleListOwnMemberId(
		memberId: string,
		paginationDto: SchedulePaginationReqDto,
		pagination: Pagination<ScheduleEntity>,
	): Promise<BasicPaginationResponse<ScheduleGetListResDto>> {
		const { page, limit, options } = paginationDto;
		const { take, skip } = getOffset({ page, limit });

		const whereOverride: FindOptionsWhere<ScheduleEntity> =
			this.getScheduleListWhereOverride(options, memberId);

		const { list, count }: { list: ScheduleGetListResDto[]; count: number } =
			await pagination.paginate(paginationDto, this.scheduleRepository, {
				select: {
					id: true,
					groupId: true,
					scheduleImage: true,
					scheduleName: true,
					startPeriod: true,
					endPeriod: true,
					updatedAt: true,
					group: {
						id: true,
						groupName: true,
						groupDescription: true,
						groupCoverImage: true,
					},
					sharedMembers: {
						sharedFamId: true,
						sharedMember: {
							id: true,
							role: true,
							invitationAccepted: true,
							memberId: true,
							member: {
								id: true,
								username: true,
								profileImage: true,
								email: true,
							},
						},
					},
				},
				where: {
					...whereOverride,
				},
				relations: {
					group: true,
					sharedMembers: {
						sharedMember: {
							member: true,
						},
					},
				},
				order: {
					updatedAt: 'desc',
				},
				take,
				skip,
			});

		const sheduleIds = list.map((item) => item.id);
		const sharedMembers =
			await this.sharedScheduleMemberRepository.findSharedScheduleMembers(
				sheduleIds,
			);

		return {
			list: list.map((item) => {
				return {
					...item,
					sharedMembers: sharedMembers.filter(
						(data) => data.sharedScheduleId === item.id,
					),
				};
			}),
			page,
			count,
			take,
		};
	}

	async getScheduleListByGroupId({
		memberId,
		groupId,
		page,
		limit,
	}: {
		memberId: string;
		groupId: string;
		page: number;
		limit: number;
	}): Promise<ScheduleResDto> {
		const { take, skip } = getOffset({ page, limit });

		const [list, count] =
			await this.scheduleRepository.getScheduleListOwnMemberId({
				overrideWhere: {
					groupId,
					memberId,
				},
				take,
				skip,
			});

		return {
			list: list,
			page: page,
			totalPage: Math.ceil(count / take),
		};
	}

	async getOneScheduleById(scheduleId: string) {
		const schedule = await this.scheduleRepository.getOneScheduleById(
			scheduleId,
		);

		if (!schedule) throw EntityNotFoundException(ERROR_SCHEDULE_NOT_FOUND);

		return schedule;
	}

	async createToursSchedule(
		{ scheduleItem, ...rest }: ICreateTourArgs,
		qr?: QueryRunner,
	): Promise<ScheduleByIdResDto> {
		const { scheduleName, periods, startPeriod, endPeriod, sharedFamIds } =
			scheduleItem;

		const newSchedule = this.scheduleRepository.create({
			id: uuidv4(),
			scheduleName,
			startPeriod,
			endPeriod,
			...rest,
		});

		const schedule = await this.scheduleRepository.createSchedule(
			newSchedule,
			qr,
		);

		await this.createSharedScheduleMember(sharedFamIds, schedule.id, qr);

		const createTourismPeriod = await this.createTourismPeriod(
			periods,
			schedule.id,
			qr,
		);

		createTourismPeriod.map(
			async (item) => await this.createTourism(item.tourisms, item.id, qr),
		);

		return schedule;
	}

	async updateToursSchedule(
		{ scheduleItem, ...rest }: IUpdateTourArgs,
		qr?: QueryRunner,
	): Promise<ScheduleByIdResDto> {
		const { scheduleName, periods, sharedFamIds } = scheduleItem;
		const schedule = await this.scheduleRepository.updateScheduleGroup(
			{
				...rest,
				scheduleName,
			},
			qr,
		);

		// SharedScheduleMember 삭제
		// 공유된 멤버 삭제
		await this.deleteSharedScheduleMember(schedule.id, qr);

		// SharedScheduleMember 생성
		await this.createSharedScheduleMember(sharedFamIds, schedule.id, qr);

		// Tourism 먼저 다 삭제
		const periodIds =
			await this.tourismPeriodRepository.findTourismPeriodsByScheduleId(
				rest.scheduleId,
			);
		await Promise.all(
			periodIds.map(async (item) => await this.deleteTourism(item.id, qr)),
		);

		// TourismPeriod 다 삭제
		await this.deleteTourismPeriod(rest.scheduleId, qr);

		// TourismPeriod 생성
		const createTourismPeriod = await this.createTourismPeriod(
			periods,
			schedule.id,
			qr,
		);

		// Tourism 생성
		createTourismPeriod.map(
			async (item) => await this.createTourism(item.tourisms, item.id, qr),
		);

		return schedule;
	}

	async updateScheduleTitleById(scheduleId: string, scheduleName: string) {
		return await this.scheduleRepository.updateScheduleTitleById(
			scheduleId,
			scheduleName,
		);
	}

	async updateScheduleThumbnail(scheduleId: string, imageUrl: string) {
		return await this.scheduleRepository.updateScheduleThumbnail(
			scheduleId,
			imageUrl,
		);
	}

	async deleteToursSchedule(
		scheduleId: string,
		qr?: QueryRunner,
	): Promise<void> {
		// Tourism 먼저 다 삭제
		const periodIds =
			await this.tourismPeriodRepository.findTourismPeriodsByScheduleId(
				scheduleId,
			);
		await Promise.all(
			periodIds.map(async (item) => await this.deleteTourism(item.id, qr)),
		);

		// TourismPeriod 다 삭제
		await this.deleteTourismPeriod(scheduleId, qr);

		// 공유된 멤버 삭제
		await this.deleteSharedScheduleMember(scheduleId, qr);

		// Schedule 삭제
		await this.scheduleRepository.deleteSchedule(scheduleId, qr);
	}

	async findOwnSchedule(
		scheduleId: string,
		memberId: string,
	): Promise<ScheduleByIdResDto> {
		const schedule = await this.scheduleRepository.findOwnSchedule(
			scheduleId,
			memberId,
		);
		if (!schedule) throw ForBiddenException(ERROR_NO_PERMISSTION_TO_SCHEDULE);

		return schedule;
	}

	async isMineScheduleExists(
		scheduleId: string,
		memberId: string,
	): Promise<boolean> {
		return await this.scheduleRepository.exist({
			where: {
				id: scheduleId,
				memberId,
			},
		});
	}

	async findScheduleById(scheduleId: string): Promise<ScheduleByIdResDto> {
		const schedule = await this.scheduleRepository.findScheduleById(scheduleId);

		if (!schedule) throw EntityNotFoundException(ERROR_SCHEDULE_NOT_FOUND);

		return schedule;
	}

	async scheduleExistsByScheduleId(scheduleId: string) {
		return this.scheduleRepository.exist({ where: { id: scheduleId } });
	}

	private addMemberIdIfNotExists(sharedFamIds: string[], memberId: string) {
		if (sharedFamIds.find((item) => item !== memberId)) {
			[...sharedFamIds] = [...sharedFamIds, memberId];
		}

		return sharedFamIds;
	}

	private async deleteSharedScheduleMember(
		scheduleId: string,
		qr?: QueryRunner,
	) {
		await this.sharedScheduleMemberRepository.deleteSharedScheduleMember(
			scheduleId,
			qr,
		);
	}

	private async deleteTourismPeriod(scheduleId: string, qr?: QueryRunner) {
		await this.tourismPeriodRepository.deleteTourismPeriod(scheduleId, qr);
	}

	private async deleteTourism(periodId: string, qr?: QueryRunner) {
		await this.tourismRepository.deleteTourism(periodId, qr);
	}

	private async createSharedScheduleMember(
		sharedFamIds: string[],
		sharedScheduleId: string,
		qr?: QueryRunner,
	) {
		const createSharedScheduleMember =
			this.sharedScheduleMemberRepository.create(
				sharedFamIds.map(
					(item): OverrideInsertFeild<SharedScheduleMemberEntity> => ({
						sharedFamId: item,
						sharedScheduleId,
					}),
				),
			);

		await this.sharedScheduleMemberRepository.createSharedScheduleMember(
			createSharedScheduleMember,
			qr,
		);
	}

	private async createTourismPeriod(
		periods: TourismPeriodCreateReqDto[],
		scheduleId: string,
		qr?: QueryRunner,
	) {
		const createTourismPeriod = this.tourismPeriodRepository.create(
			periods.map(
				(item): OverrideInsertFeild<TourismPeriodEntity> => ({
					id: uuidv4(),
					scheduleId,
					...item,
				}),
			),
		);

		await this.tourismPeriodRepository.createTourismPeriod(
			createTourismPeriod,
			qr,
		);

		return createTourismPeriod;
	}

	private async createTourism(
		tourism: TourismCreateReqDto[],
		periodId: string,
		qr?: QueryRunner,
	) {
		const createTourisms = this.tourismRepository.create(
			tourism.map(
				(item): OverrideInsertFeild<TourismEntity> => ({
					id: uuidv4(),
					periodId,
					...item,
				}),
			),
		);

		await this.tourismRepository.createTourism(createTourisms, qr);
	}

	private getScheduleListWhereOverride(
		options: Union<typeof isScheduleOptins>,
		memberId: string,
	) {
		switch (options) {
			case 'SCHEDULEALL':
				return { sharedMembers: { sharedMember: { memberId } } };
			case 'MYSCHEDULE':
				return { memberId };
			case 'SHAREDSCHEDULE':
				return { sharedMembers: { sharedMember: { memberId } } };
		}
	}
}
