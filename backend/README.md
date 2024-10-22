# 1. group table, fam table username으로 사용자 검색시 해당 유저가 속한 groupId를 알 수 있음.

# 2. 검색한 사람의 유저 Id를 이용하여 검색한 사람이 속한 groupId를 가져와서 위의 groupId들과 비교하는 로직.

# 3. 추후에 그룹끼리의 팔로우 기능을 추가 할시 내가 속한 groupId와 팔로우된 groupId를 포함해서 1번의 유저가 속한 groupId랑 비교해야됨.

## 즉 조회 할 수 있는 그룹은 총 내가 속한 그룹 + 내가 속한 그룹이 팔로우한 그룹

## (이런 고민을 했어요)

- [NestJS에서 쿼리빌더의 결과 객체들을 병합하는 방법 with es-toolki](https://threeyears.tistory.com/637)
- [NestJS Swaager 사용시 직관적이고 구체적인 응답 문서화 하기](https://threeyears.tistory.com/555)
- [NestJS ResponseDto 적극 활용하기](https://threeyears.tistory.com/553)
- [외부 api사용시 class-transformer의 클래스 인스턴스화 하기](https://threeyears.tistory.com/560)
- Nestjs class-validator `ValidateNested` 데코레이터 n개의 중첩객체 validation 방법 [링크](https://threeyears.tistory.com/513)
- Nestjs class-validator global Validation-pipe 사용시 에러 메세지 커스텀하기
- cookie-option에서 `secure:true` 사용시 safari 브라우저에서 localhost에 cookie 저장이 안되는 문제 [링크](https://threeyears.tistory.com/517)
- cookie-option에서 signed 옵션으로 cookie-parser 사용시 secret-key로 검증하여 보안 강화하기 [링크](https://threeyears.tistory.com/502)
- pagination 기능을 위한 pagination module 생성시 발생하는 결합도를 낮추기 위한 Interceptor를 이용한 AOP 구현 [링크](https://threeyears.tistory.com/518)
- NestJS에서 repository의 insert메서드로 유동적으로 데이터 생성하기 [링크](https://threeyears.tistory.com/526)
- NestJS Response Dto에 generic을 swagger ApiProperty 데코레이터에 사용하기 [링크](https://threeyears.tistory.com/525)
- TypeOrm과 js-joda를 이용한 Date타입 대신 LocalDateTime 타입 사용하기 [링크](https://threeyears.tistory.com/549)
- [production환경에서 Seed와 Migration 사용하기](https://threeyears.tistory.com/580)
- [Log와 모니터링](https://threeyears.tistory.com/581)
- [NestJS와 ioredis를 이용한 초대링크 만료 시간 설정하기](https://threeyears.tistory.com/599)
- [NestJS에서 Redis를 활용한 최근 검색어 기능 구현](https://threeyears.tistory.com/614)
- [NestJS에서 Redis를 활용한 좋아요 성능 개선](https://threeyears.tistory.com/621)

# 그룹 간의 팔로우 기능

1. A 사용자가 A그룹에 가입, B그룹에 가입 C그룹에 가입
2. B 사용자가 D그룹에 가입, E그룹에 가입, F그룹에 가입
3. A 그룹과 D그룹이 팔로우, D그룹이 A그룹을 팔로우 (양방향 팔로우)
4. A 그룹이 E그룹에 팔로우, E그룹이 A그룹을 팔로우 (양방향 팔로우)
5. F그룹이 A그룹에 팔로우 (단방향 팔로우)
6. A 사용자가 A그룹에 피드를 작성 -> 양방향 팔로우 관계인 D그룹과 E그룹의 멤버들한테 피드가 노출.
7. F그룹은 단방향 팔로우 관계이기 때문에 F그룹에는 멤버들에게는 해당 피드가 노출되지 않음.
8. 근데 만약 A 사용자가 A그룹에 피드를 작성 할때 isVisibleToFollowers 속성을 true로 설정 했다면?
9. 이럴경우 F그룹의 멤버들에게 피드가 노출되고 + 양방향 팔로우인 D그룹과 E그룹의 멤버들에게도 피드가 노출됨.
