# Build React App
FROM node:alpine3.18 as build

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 파일 디렉토리에 복사
COPY package.json .

# 패키지 설치
RUN npm install

# 나머지 소스코드 복사
COPY . .

# 빌드
RUN npm run build

# Server Setting nginx
FROM nginx:1.23-alpine

# nginx 이미지
WORKDIR /usr/share/nginx/html

# 기존 도커 컨테이너 삭제
RUN rm -rf ./*

# nginx 디렉토리에 리액트 빌드 파일 복사
COPY --from=build /app/build .

# nginx 포트 설정
EXPOSE 80

# nginx 실행할 때 데몬 실행 기능 끔
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
