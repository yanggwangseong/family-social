# 1. group table, fam table username으로 사용자 검색시 해당 유저가 속한 groupId를 알 수 있음.

# 2. 검색한 사람의 유저 Id를 이용하여 검색한 사람이 속한 groupId를 가져와서 위의 groupId들과 비교하는 로직.

# 3. 추후에 그룹끼리의 팔로우 기능을 추가 할시 내가 속한 groupId와 팔로우된 groupId를 포함해서 1번의 유저가 속한 groupId랑 비교해야됨.

## 즉 조회 할 수 있는 그룹은 총 내가 속한 그룹 + 내가 속한 그룹이 팔로우한 그룹

## (이런 고민을 했어요)

- Nestjs class-validator `ValidateNested` 데코레이터 n개의 중첩객체 validation 방법 [링크](https://threeyears.tistory.com/513)
- Nestjs class-validator global Validation-pipe 사용시 에러 메세지 커스텀하기
- cookie-option에서 `secure:true` 사용시 safari 브라우저에서 localhost에 cookie 저장이 안되는 문제 [링크](https://threeyears.tistory.com/517)
- cookie-option에서 signed 옵션으로 cookie-parser 사용시 secret-key로 검증하여 보안 강화하기 [링크](https://threeyears.tistory.com/502)
- pagination 기능을 위한 pagination module 생성시 발생하는 결합도를 낮추기 위한 Interceptor를 이용한 AOP 구현 [링크](https://threeyears.tistory.com/518)
- NestJS에서 repository의 insert메서드로 유동적으로 데이터 생성하기 [링크](https://threeyears.tistory.com/526)
- NestJS Response Dto에 generic을 swagger ApiProperty 데코레이터에 사용하기 [링크](https://threeyears.tistory.com/525)
- TypeOrm과 js-joda를 이용한 Date타입 대신 LocalDateTime 타입 사용하기 [링크](https://threeyears.tistory.com/549)
