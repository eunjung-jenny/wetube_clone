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

### 6) Dependency

- 프로젝트가 실행되기 위해 필요한 것들을 표시함

### 7) Middleware (in express)

- 유저가 웹사이트에 접근하고자하는 request를 보내면, index.js 파일이 실행되고, 요청받은 route의 존재 여부를 확인하여 response를 보내게 됨
- 유저와 마지막 response 사이에 존재하는 함수들을 middleware라고 함
- 이 때 middleware는 next 를 통해 해당 middleware 가 실행된 이후 다음 middleware 또는 response 가 진행될 수 있는 권한을 넘겨주게 됨 (next 함수를 실행하는 대신 middleware 수준에서 res.send()를 실행하면 connection을 중간에서 끊을 수 있음)
  - express 에서 connection 과 관련된 모든 요소들은 request, response, next 를 매개변수로 갖고 있음
- middleware의 개수는 제한이 없음
- middleware를 통해 유저의 로그인 여부 확인, 로그 작성, ip 주소 확인 등과 관련된 작업 등을 수행할 수 있음
- connection 이 발생할 때, index.js 파일을 상단에서부터 실행하므로 middleware 코드 위치에 따라 진행되는 작업을 다르게 설정할 수 있음

- **유용한 middleware**
  - `npm install morgan` : logging (기록)
    - 옵션에 따라 (tiny, dev, etc.) 기록 방식이 달라짐
  - `npm install helmet` : nodeJS 앱의 보안 향상
  - `npm install body-parser` : form을 서버로 전송하는 경우 이를 받을 수 있도록 함 (to be continued..)
    - 옵션에 따라 받아서 parsing 할 수 있는 형식이 달라짐
  - `npm install cookie-parser` : session을 다룰 수 있도록 함 (to be continued..)

### 8) router & route

- router는 route들을 범주화하여 복잡성을 쪼개줌
- router 내 route 개수에는 제한이 없음

### 9) MVC 패턴

- Model : data
- View : how do the data look
- Control : function thatn looks for the data

  - Controller : 일반적으로 하나의 데이터셋마다 하나의 컨트롤러를 설정
    - 현 시점에서는 video, user에 대해 컨트롤러를 하나씩 만들 예정
    - 라우터에 annonymous 함수로 작성한 부분을 컨트롤러로 작성하면 됨

- M, V, C 에 해당하는 파트들을 서로 분리하여 작성하고 관리

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

### 5) BabelNode 설치

```bash
npm install @babel/node
npm install @babel/core
npm install @babel/preset-env # 안정적인 수준에서 가장 최신의 문법까지 허용
```

- [babel](https://babeljs.io/) 은 최신 JS 문법을 이전의 버전으로 변환해줌

- `.babelrc` 파일을 생성하여 nodeJS와 관련된 설정을 모두 명시해두면, 웹/앱을 실행할 때 시스템은 이 파일을 먼저 살펴본 뒤 설정에 맞게 실행시킴

- package.json 파일의 `"start": "node index.js"` 를 `"start": "babel-node index.js"` 로 변경하여 babel 이 파일을 실행하게끔 변경

### 6) Nodemon 설치

```bash
npm install nodemon -D # -D 를 통해 dependency에 포함되는 것을 막을 수 있으며, 이는 devDependency에 포함됨
```

- 코드 변경 사항이 있을 때마다 자동으로 서버를 재시작
- package.json 파일의 `"start": "babel-node index.js"`를 `"start": "nodemon --exec babel-node index.js"` 로 변경하여 babel 이 파일을 실행하게끔 변경 -`"start": "nodemon --exec babel-node index.js --delay 2"` : 코드 변경(저장) 후 2초를 기다린 후에 서버를 재시작, babel 이 코드를 변환할 때까지 기다려줌으로써 코드 변경시마다 서버가 2번씩 재시작되는 것을 방지함

### 7) Pug

#### (1) 설치

- express 의 view engine, 템플릿 언어
- 템플릿을 활용하여 모든 페이지에 동일하게 적용될 html, css 와 관련된 반복적인 작업을 줄여줌

```bash
npm install pug
```

- express [`app.set(name, value`](https://expressjs.com/ko/api.html#app.set)
  - express app 의 설정 변경

```python
app.set("view engine", "pug"); # view engine 을 pug 로 변경 # html 파일의 디폴트 폴더
app.set("views", [기본 폴더 경로]); # 디폴트 값은 "/views"  => views 폴더 생성 & 파일 확장자는 .pug
```

#### (2) 사용법

##### basic grammar & template

- 컨트롤러에서 `res.send` 대신 `res.render([pug 파일명])` 작성 : app.set 의 views 에 설정된 기본 폴더 내에서 해당 파일을 탐색하여 렌더링 하게 됨
- layouts (폴더명은 원하는 대로 가능) 폴더 내에 모든 페이지에 공통되는 html 코드를 템플릿화
  - 각 페이지별 내용이 들어갈 자리는 `block content` (content 는 이름을 명명한 것으로 원하는 것으로 변경가능) 로 표시
- 각 페이지별 pug 파일에서 `extends [템플릿 파일 경로]`로 템플릿 활용 의사를 밝히고, `block content` 내부에 원하는 내용을 작성
- html 의 `<p class=">hello</p>` 은 pug 에서 `p hello` 와 동일
- 태그간 자손 관계는 tab 으로 표현

##### partials

- 템플릿을 보다 조직적이고 구조적으로 만들기 위한 방식
- `include [파일 경로]`를 통해 여러 pug 템플릿을 취합

##### Pug with JS

- Pug 파일 내에 `#{[JS code]}` 를 통해 JS 활용

##### template with information from controller

- 템플릿 정보 입력

  - local variable 을 global variable 처럼 사용 가능하게끔 하는 middleware 활용
  - 해당 함수가 실행되는 위치에 유의
  - [`res.locals`](https://expressjs.com/ko/api.html#res.locals) : local variable 로 respond

- 각 페이지별 정보 입력

  - cotroller 파일에서 `res.render` 의 두번째 인자로 템플릿에서 사용될 정보들을 딕셔너리 형태로 입력
  - 컨트롤러 (`res.render([pug파일], [정보])`)에서 정보가 pug 파일로 전달 => pug 파일은 템플릿에서 extend => 템플릿에 정보가 전달
