# WeTube

- Youtube Clone with [노마드아카데미](https://academy.nomadcoders.co/)
- 유투브라는 웹앱을 웹사이트로 구현

## 1. 이론

### 1) 웹사이트 vs 웹앱

- 웹사이트 : 컨텐츠 소비 중심
- 웹앱 : 소비 이외의 인터랙티브한 활동 중심

- 바닐라JS: 인터랙티브한 웹앱 구현에는 적절하지 않을 수 있으나, 적은 인터랙티브 요소를 갖춘 웹사이트 구현에는 탁월

### 2) nodeJS

- 브라우저 바깥의 JS

### 3) nodeJS vs Django

- nodeJS
  - 무에서 유를 창조해야 하는 편
  - 대량의 데이터(대량 알림, 실시간 처리 등)를 다뤄야 하는 경우에 강점을 보임 (데이터 사이언스 x)
  - 메모리, 램 등 하드웨어에 대한 access 가 없어서 하드코어한 처리가 어려움
- Django:
  - 기본 틀이 많이 잡혀져있는 편
  - 하드웨어 파워가 필요한 경우 (데이터 사이언스, 이미지 변경 등)
  - 채팅이나 우버 같은 실시간 처리 어려움

### 4) 서버

- 네트워크를 통해 request 를 받고 response

- [**express.js**](https://github.com/expressjs/express): nodeJS 웹서버 구축을 위한 대표적인 프레임워크
  > The Express philosophy is to provide small, robust tooling for HTTP servers, making it a great solution for single page applications, web sites, hybrids, or public HTTP APIs.

### 5) GET & POST

- 일반적으로 주소창에 url 입력시 브라우저는 GET 메서드를 통해 웹페이지를 읽어오게 됨
  - 그에 대한 응답을 해줘야 하며 이를 설정하지 않으면 무한 로딩에 빠짐
- 그리고 POST 메서드를 통해 정보를 웹사이트에 전달하게 됨 (ex. 로그인, 댓글 입력)

## 2. 클론

### 1) nodeJS 설치

```bash
brew install node # installer 없이 설치
node # nodeJS 실행
node -v # nodeJS 버전 체크
brew update node # 업데이트

node [파일명] # node로 실행
```

- `brew install node` installer 없이 설치

### 2) expressjs 설치

- [**npm**](https://www.npmjs.com/) (node package manager): nodeJS 와 관련된 모든 package들을 넣어두는 공간의 개념
  - 좋은 점은?
    - 패키지가 업데이트 될 때마다 체크하고 재다운로드 하는 등의 행동을 하지 않아도 됨
    - 외부 패키지를 사용하는 프로젝트를 다른 사람이 사용ㅎ려고 할 때에 일일이 패키지를 설치해주지 않아도 됨

```bash
npm -v # npm 버전 체크 # npm 은 node.js 설치시 자동으로 설치됨
npm init # npm 을 package manager 로 사용하는 프로젝트를 시작 => package.json 생성 (package: 만들고 있는 웹사이트를 의미)
npm install express # express 는 해당 프로젝트 폴더 내, package.json 파일 생성 후에 설치해야 함 => 함께 다운로드된 외부 패키지들의 폴더인  node_modules 생성, package-lock.json 파일 생성, package.json 파일 내에 "dependencies" 항목 추가
```

- **package.json 파일의 유용성**: 협업을 위해 프로젝트를 공유할 때에 index.js, package.json 파일만 전해주고 npm install 명령어를 실행하면 dependencies 항목에 따라 필요한 패키지가 모두 설치됨

- **.gitignore**: git 이 관리하지 않게끔 할 파일/폴더를 설정 -[nodeJS에서의 표준](https://github.com/github/gitignore/blob/master/Node.gitignore)
  - package-lock.json: 패키지 보안과 관련되어 있으므로 .gitignore에 포함시킴

### 3) express 서버 만들기

```javascript
const express = require("express"); // require: 해당 폴더명을 갖는 모듈을 찾아서 가져옴
const app = express(); // 가져온 express 모듈을 실행

app.listen(4000); // 4000번 포트의 요청을 받도록 함
```

### 4) Route 와 response 설정

```javascript
function handleHome(req, res) {
  console.log(req);
  res.send("Hello from home!");
}

app.get("/", handleHome); // main URL
```

- `res.send("text")` : text 부분에 완성된 html, css 를 보내주어야 함
