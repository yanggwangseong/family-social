# Node.js 버전을 선택합니다.
FROM node:18-alpine3.18

# 작업 디렉토리를 생성합니다.
WORKDIR /app

# 앱의 종속성 파일들을 복사합니다.
COPY package*.json ./

# 종속성을 설치합니다.
RUN npm install

# 앱 소스 코드를 복사합니다.
COPY . .

# 앱을 빌드합니다.
RUN npm run build

# 앱을 실행합니다.
CMD ["npm", "run", "start:prod"]