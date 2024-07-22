import { Type } from '@nestjs/common';
import { ApiPropertyOptions } from '@nestjs/swagger';

// 스웨거 메타데이터 키
const DECORATORS_PREFIX = 'swagger';
const API_MODEL_PROPERTIES = `${DECORATORS_PREFIX}/apiModelProperties`;
const API_MODEL_PROPERTIES_ARRAY = `${DECORATORS_PREFIX}/apiModelPropertiesArray`;

type FunctionType = (...args: any[]) => any;
// source form lodash
function isObject(value: null | object | FunctionType) {
	const type = typeof value;
	return value != null && (type == 'object' || type == 'function');
}

// 기본생성자 함수
function isFunction(value: any): value is FunctionType {
	if (!isObject(value)) {
		return false;
	}
	return true;
}

// () => type 형태의 순환참조로 기술했을때 가져오는 함수
function isLazyTypeFunc(
	type: FunctionType | Type<unknown>,
): type is { type: FunctionType } & FunctionType {
	return isFunction(type) && type.name == 'type';
}

// 원시타입인지 확인
function isPrimitiveType(
	type:
		| string
		| FunctionType
		| Type<unknown>
		| [FunctionType]
		| Record<string, any>
		| undefined,
): boolean {
	return (
		typeof type === 'function' &&
		[String, Boolean, Number].some((item) => item === type)
	);
}

// Type 인지 확인하는 커스텀 타입 체커
function checkType(object: any): object is Type {
	return object;
}

type ApiPropertyOptionsWithFieldName = ApiPropertyOptions & {
	fieldName: string;
};

/**
 * @param dtoClass Type 디티오 타입
 * @param generic 옵셔널 합니다 안주시면 제네릭 안만듭니다. Type 제네릭이 있을경우 제네릭 디티오를 넘겨줍니다.
 * @returns apiProperty 정보를 통해 만든 객체
 */
export function makeInstanceByApiProperty<T>(
	dtoClass: Type,
	generic?: Type,
): T {
	// 디티오로 생성자를 만들지 않고 해당 타입만 가져옴.
	// 생성자에 인자가 들어간경우 에러가 남.
	const mappingDto: Record<string, any> = {};

	// metadata 에서 apiProperty로 저장했던 필드명들을 불러옴
	const propertiesArray: string[] =
		Reflect.getMetadata(API_MODEL_PROPERTIES_ARRAY, dtoClass.prototype) || [];

	// apiProperty로 적었던 필드명 하나하나의 정보를 가져오기 위함
	const properties: ApiPropertyOptionsWithFieldName[] = propertiesArray.map(
		(field) => {
			// :fieldName 형식이라서 앞에 : 를 짤라줌
			const fieldName = field.substring(1);
			// 각 필드마다 메타데이터를 가져옴
			const obj = Reflect.getMetadata(
				API_MODEL_PROPERTIES,
				dtoClass.prototype,
				fieldName,
			);
			obj.fieldName = fieldName;
			return obj;
		},
	);

	//  mappingDto 를 만듬
	for (const property of properties) {
		const propertyType = property.type;
		// console.log(
		//   'fiste',
		//   propertyType,
		//   property,
		//   mappingDto[property.fieldName]
		// );

		// property.type apiproperty에 type 을 기술 않할 수 있으므로 undefiend 체크
		if (propertyType) {
			// 이건 커스텀임 generic을 위한 커스텀
			// dto에 T 제네릭으로 들어가는게 있다면 type을 generic 으로 적어주세요
			if (propertyType === 'generic') {
				// generic으로 만들 추가적인 타입이 있다면
				if (generic) {
					// array 형이면 [] 안에 담아서 재귀 호출
					if (property.isArray) {
						mappingDto[property.fieldName] = [
							makeInstanceByApiProperty(generic),
						];
					} else {
						// {} 형이면 그냥 바로 호출
						mappingDto[property.fieldName] = makeInstanceByApiProperty(generic);
					}
				}
			} else if (propertyType === 'string') {
				// 스트링 형태의 enum
				if (typeof property.example !== 'undefined') {
					mappingDto[property.fieldName] = property.example;
				} else {
					mappingDto[property.fieldName] = property.description;
				}
				// console.log(
				//   'fiste',
				//   propertyType,
				//   property,
				//   mappingDto[property.fieldName]
				// );
			} else if (propertyType === 'number') {
				// 숫자형태의 enum
				if (typeof property.example !== 'undefined') {
					mappingDto[property.fieldName] = property.example;
				} else {
					mappingDto[property.fieldName] = property.description;
				}
				// console.log('fiste', propertyType, mappingDto[property.fieldName]);
			} else if (isPrimitiveType(propertyType)) {
				// 원시타입 [String, Boolean, Number]

				// console.log('asdfasdfas', property, propertyType);
				if (typeof property.example !== 'undefined') {
					mappingDto[property.fieldName] = property.example;
				} else {
					mappingDto[property.fieldName] = property.description;
				}
			} else if (isLazyTypeFunc(propertyType as FunctionType | Type<unknown>)) {
				// type: () => PageMetaDto  형태의 lazy
				// 익명함수를 실행시켜 안에 Dto 타입을 가져옵니다.

				const constructorType = (propertyType as FunctionType)();
				// console.log('fiste', propertyType, property, constructorType);

				if (Array.isArray(constructorType)) {
					mappingDto[property.fieldName] = [
						makeInstanceByApiProperty(constructorType[0]),
					];
				} else if (property.isArray) {
					mappingDto[property.fieldName] = [
						makeInstanceByApiProperty(constructorType),
					];
				} else {
					mappingDto[property.fieldName] =
						makeInstanceByApiProperty(constructorType);
				}
			} else if (checkType(propertyType)) {
				//마지막 정상적인 클래스 형태의 타입
				if (property.isArray) {
					mappingDto[property.fieldName] = [
						makeInstanceByApiProperty(propertyType),
					];
				} else {
					mappingDto[property.fieldName] =
						makeInstanceByApiProperty(propertyType);
				}
			}
		}
	}
	return mappingDto as T;
}
