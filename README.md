# Choose Tale - 백엔드 서버

Choose Tale은 사용자가 자신만의 인터랙티브 스토리를 만들고 플레이할 수 있는 플랫폼입니다. 이 저장소는 Choose Tale의 백엔드 서버 코드를 포함하고 있습니다.

## 기술 스택

- **프레임워크**: NestJS
- **데이터베이스**: PostgreSQL (Prisma ORM)
- **인증**: JWT, Express-session
- **문서화**: Nestia/Swagger
- **배포**: Docker
- **테스트**: Jest
- **API 클라이언트**: Nestia SDK

## 주요 기능

- 사용자 인증 및 프로필 관리
- 게임 생성 및 관리
- 인터랙티브 스토리 빌더
- 게임 플레이 시스템
- 이미지 업로드 및 관리 (AWS S3)

## 프로젝트 구조 (도메인 구조)

```
src/
├── common/              # 공통 유틸리티, 가드, 필터 등
├── config/              # 환경 설정
├── game-builder/        # 게임 제작 기능
├── game-play/           # 게임 플레이 기능
├── my-page/             # 사용자 마이페이지 기능
├── user/                # 사용자 인증 및 관리
├── app.controller.ts    # 메인 컨트롤러
├── app.module.ts        # 메인 모듈
└── main.ts              # 애플리케이션 진입점
```

## 시작하기

### 로컬 개발 환경 설정

1. 저장소 클론

```bash
git clone [repository-url]
cd choose-tale
```

2. 의존성 설치

```bash
npm install
# 또는
yarn install
```

3. 환경 변수 설정
   `.env` 또는 `.env.local` 파일을 생성하고 필요한 환경 변수를 설정합니다.

4. Docker 설정 실행

```bash
npm run docker:setup
# 또는
yarn docker:setup
```

5. 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
```

## 명령어

### Docker 설정

```bash
npm run docker:setup
```

로컬 환경에서 서버를 가동시킬 수 있도록 기본 컨테이너(PostgreSQL 등)를 구축합니다.

### 타입 패키지 배포

```bash
npm run type-publish
```

Nestia SDK를 사용해 API 타입 패키지를 배포합니다.

### 개발 모드 실행

```bash
npm run dev               # 개발 환경
npm run dev:prod          # 프로덕션 환경 설정으로 개발
npm run dev:docker        # Docker 환경에서 개발
```

## API 문서

개발 환경에서 서버 실행 시 `http://localhost:[PORT]/api-docs`에서 Swagger UI를 통해 API 문서를 확인할 수 있습니다.
