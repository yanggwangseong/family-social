import { CreatedAtDecorator } from '@/common/decorators/entity/created-at.decorator';
import { UpdatedAtDecorator } from '@/common/decorators/entity/updated-at.decorator';

export abstract class CreatedUpdatedAtEntity {
	@CreatedAtDecorator()
	createdAt!: Date;

	@UpdatedAtDecorator()
	updatedAt!: Date;
}
