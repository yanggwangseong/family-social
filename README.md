# family-social

## 요청 URL

prefix로 `/api`를 붙입니다.

## Http Exception Filter

요청 실패시 아래 형식으로 응답합니다.

```
{
  success: false,
  timestamp: "2023-02-22T06:25:08.663Z",
  status: 404,
  message: "공지사항을 찾을 수 없습니다",
  path: "/api/users"
}
```

## Success Interceptor

요청 성공시 아래 형식으로 응답합니다.

```
{
  success: true,
  data: "Hello World!"
}
```

#### local 개발 환경에서 docker로 Redis aws 환경에서 aws ElasticCache

## TODO 프로젝트 완성 프리뷰 gif로 보여주기

## TODO 프로젝트 디렉토리 구조

## TODO 프로젝트 인프라 그림

## 기본적인 프로젝트 설명과 해당 프로젝트에서 사용하는 기술 socket.io, redis, sse 어떻게 적재적소로 사용 했는지에 대해

## 추후 추가 할 기능들에 대한 서술

## TODO 부하 테스트 (Artillery)

## Monitoring (Sentry + Slack + Winton)

## 반복적으로 진행하는 수동적인 작업에 불편을 느껴 자동화를 진행해본 경험 :

1. 이슈나 티켓 번호를 커밋 메세지마다 달아주는거 + 커밋 메시지 작성하는거,
2. husky를 이용한 eslint와 prettier 코드 검증 자동화
3. 자주 보는 기술 블로그들 자동 수집화
