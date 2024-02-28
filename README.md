# PBL Notes

![intro image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F7945ce06-31b8-485f-a423-8a34ee0101a2%2Fc0686b48-3e5b-4a68-9997-1e10e2798106%2F%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2024-02-28_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_11.21.20.png?table=block&id=fdca3b46-0819-4d16-96ee-c1c1bc100d31&spaceId=7945ce06-31b8-485f-a423-8a34ee0101a2&width=2000&userId=9ac6e46f-eb3f-4360-ba9b-d2b06414fced&cache=v2)

- **배포 URL** : [https://pbl-notes.netlify.app/](https://pbl-notes.netlify.app/)
- **개발 기간** : 2024.02.08 ~ 2024.02.28 (20일)
- **기여도** : 100% (개인 프로젝트)

<br>

## 프로젝트 소개

- `PBL` 은 `Problem Based Learning` 의 약자로 구름톤 트레이닝 과정에서 플레이어들이 수행하게 되는 문제 해결 기반 학습을 의미합니다.
- 해당 프로젝트는 과제에서 주어진 요구사항을 모두 구현하는 것에 그치지 않고, 한 걸음 더 나아가 실사용할 수 있는 웹 기반 노트 앱 서비스를 만들기 위해 시작되었습니다.
- 서비스를 사용하며 생성되는 모든 데이터들은 서버를 통하지 않고 사용자의 브라우저에 저장됩니다. (PC 저장 공간의 최대 50%까지 사용)

<br>

## 개발 환경 (Only FE)

### React
> 브라우저 내에서 불필요한 리로딩을 최소화 하여 네이티브 앱과 비슷한 UX를 구현하기 위해 도입하였습니다.

### Redux (RTK)
> ( 작성중... )

### TypeScript
> 복잡한 어플리케이션을 구현함에 있어 실수로 인해 예상하지 못한 런타임에러를 최대한 방지하고자 도입하였습니다.

### React Router Dom
> ( 작성중... )

### React Hook Form
> 폴더를 생성함에 있어 

### Styled Components
> 유지보수를 고려해서 테마 별 스타일을 관리하기 위해 `theme provider` 을 사용하였습니다.  
또한 



<br>

## 시작 가이드

### Requirement

- [Node.js v18.19.0](https://nodejs.org/en/blog/release/v18.19.0)
- [Npm v10.2.3](https://nodejs.org/en/blog/release/v18.19.0)

### Installation

```
$ npm install
$ npm start
```

### Build

```
$ npm run build
```

<br>

> This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template.
