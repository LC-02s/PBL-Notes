# PBL Notes

![intro image](https://github.com/LC-02s/PBL-Notes/blob/review/public/img/pbl-notes-ui.jpeg?raw=true)

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

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

### React
> 브라우저 내에서 불필요한 리로딩을 최소화하여 네이티브 앱과 비슷한 UX를 구현하기 위해 도입하였습니다.

### Redux (RTK)
> 서비스 특성상 전역 상태 변경이 빈번하게 일어나기에 복잡한 상태들을 조금 더 쉽게 중앙 집중적으로 관리하기 위해 도입하였습니다.

### TypeScript
> 복잡한 어플리케이션을 구현함에 있어 실수로 인해 예상하지 못한 런타임에러를 최대한 방지하고자 도입하였습니다.

### React Router Dom
> 프로젝트 초기에는 라우터 없이 폴더 기능 구현을 시도했었지만, 폴더와 노트에 대한 여러 상태를 저 혼자 모두 커버하기에는 무리가 있다고 판단되어 도입하였습니다.  
도입 후 라우터의 도움을 받아 폴더 기능을 구현하여 기존에 사용했던 불필요한 중간 변수들과 액션 함수들을 최소화할 수 있었습니다.

### React Hook Form
> 폴더 생성 및 수정 시 이름에 대한 유효성 검사를 쉽게 구현할 수 있고, `useRef` 기반으로 동작하여 불필요한 컴포넌트의 리렌더링을 줄여 성능을 개선할 수 있기에 쓰지 않을 이유가 없었습니다.

### Styled Components
> 유지보수를 고려해서 테마 별 스타일을 편리하게 관리하기 위해 `theme provider` 을 사용하였습니다.  
서비스 특성상 전역 상태 변경이 다수 발생되어 그에 따른 스타일 변경을 쉽게 조건부로 관리할 수 있다는 것 또한 매력적이었습니다.

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
