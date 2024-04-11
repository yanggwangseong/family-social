import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseIsReadOptionsPipe implements PipeTransform {
	transform(value: any, metadata: ArgumentMetadata) {}
}
