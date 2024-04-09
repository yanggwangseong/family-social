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

## TODO 프로젝트 완성 프리뷰 gif로 보여주기

## TODO 프로젝트 디렉토리 구조

## TODO 프로젝트 인프라 그림

## 기본적인 프로젝트 설명과 해당 프로젝트에서 사용하는 기술 socket.io, redis, sse 어떻게 적재적소로 사용 했는지에 대해

## 추후 추가 할 기능들에 대한 서술
