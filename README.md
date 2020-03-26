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
  - `npm install multer`: 파일 업로드시 해당 파일의 정보들을 반환함 ([doc](https://github.com/expressjs/multer/))
    - 적용할 form 의 속성에 `enctype="multipart/form-data"`를 추가해야 함

### 8) router & route

- router는 route들을 범주화하여 복잡성을 쪼개줌
- router 내 route 개수에는 제한이 없음

### 9) MVC 패턴

- Model : data
- View : how do the data look
- Control : function that looks for the data

  - Controller : 일반적으로 하나의 데이터셋마다 하나의 컨트롤러를 설정
    - 현 시점에서는 video, user에 대해 컨트롤러를 하나씩 만들 예정
    - 라우터에 annonymous 함수로 작성한 부분을 컨트롤러로 작성하면 됨

- M, V, C 에 해당하는 파트들을 서로 분리하여 작성하고 관리

### 10) Status code

- 인터넷이 서로 어떻게 상호작용하고 있는가를 표시
- 200 : ok
- 204 : no content
- 403 : forbidden
- 400 : bad request

### 11) .env (dotenv)

- 공개해선 안되는 key들을 저장
  - .gitignore 에 추가

```javascript
import dotenv from "dotenv";
dotenv.config(); // .[파일명] 파일에 있는 정보를 process.[파일] 변수에 저장

process.env.[변수명]
```

### 12) async & await

- await 은 async 가 없이는 작동하지 않음
- await 직후의 작업이 완료될 때까지 다음 작업을 수행하지 않음
  - 작업의 성공여부와는 관계없이 작업이 완료될 때까지 기다림
- 작업을 실패하는 경우를 핸들링하기 위해 `try { ... } catch (error) { ... }` 구문을 사용

```javascript
export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};
```

### 13) Regex 정규표현식

- [참고](https://regex101.com)
- 문자열에서 특정 패턴을 탐색

### 14) Webpack 웹팩 (Front)

- module bundler
- 프로젝트에서 생성하는 여러 파일들을 호환성이 보장되는 static file (js, css, jpg, png 등) 로 변환

- `npm install webpack webpack-cli` : webpack-cli 는 터미널에서 webpack 을 사용할 수 있게 해줌

- `package.json` 스크립트 명령어 변경

  - `"dev:server": "nodemon --exec babel-node init.js --delay 2"`
  - `"build:assets": "WEBPACK_ENV=production webpack"`
  - `"dev:assets": "WEBPACK_ENV=development webpack -w"`
    - webpack : default로 `webpack.config.js` 탐색하므로 해당 파일 생성 (**babel 사용 불가**)
    - WEBPACK_ENV=development/production : `.env` 파일에 추가하지 않고도 `process.env.WEBPACK_ENV` 로 호출 가능
      - production 모드: 코드가 압축됨
      - development 모드: 에러가 어디에서 발생했는지 알 수 있도록 하기 위해 코드가 압축되지 않음
    - `-w` : 파일들을 지켜보면서 변경될 때마다 webpack 을 실행하여 새로고침 하지 않아도 적용되도록 함
    - `npm run dev:server`, `npm run build:assets`,`npm run dev:assets` 로 실행

- Usage
  - server 와 코드를 연관시키지 말 것!
  - `entry` 와 `output`으로 구성
    - entry: 입력할 파일
    - output: 변환한 파일들을 어디에 둘 것인가?
  - 자세한 사용법은 `webpack.config.js` 파일 주석 참고

### 15) import path

- Node.js 의 기본 패키지로 해당 파일의 전체 경로를 반환해 줌
- `path.resolve([...paths])`

### 16) authentication

- [참고](https://interconnection.tistory.com/74)

#### (1) HTTP (HyperText Transfer Protocol) 의 특징

- **Connectionless** : 클라이언트가 서버에 요청을 보내고, 서버가 클라이언트에 그에 대한 응답을 보낸 뒤에는 접속이 끊어짐
- **Stateless** : 접속이 끊어진 후 그와 관련된 상태 및 정보를 유지하지 않음

#### (2) 쿠키 & 세션

##### 쿠키

- 클라이언트가 서버에 요청을 보내면 서버에서 **자동으로** 응답과 함께 쿠키를 (HTTP header 에 포함) 클라이언트에 전송함
- 클라이언트로 전송된 쿠키는 유효시간동안 로컬에 저장되어 있다가 동일한 요청을 할 때에 HTTP header 에 포함되어 서버로 전송됨
- 서버에서는 쿠키를 읽어 클라이언트를 구별하고, 필요에 따라 쿠키를 업데이트하여 다시 응답과 함께 클라이언트에 전송함

##### 세션

- 클라이언트가 서버에 접속을 하면 고유한 세션ID 를 발급받게 되고 이 세션ID는 쿠키에 저장됨
- 클라이언트가 서버에 다른 요청을 할 때, 쿠키를 통해 세션ID 가 서버에 전달되고, 서버는 세션ID를 통해 클라이언트의 정보를 인식함
- 클라이언트에는 세션ID 만 전달이 되고 클라이언트에 대한 중요한 정보들은 서버에 저장을 하게 됨

  - 보안 측면에서 쿠키보다 우수하지만,
  - 서버 메모리를 사용하게 되므로 과부하로 인한 성능 저하의 요인이 될 수 있음

- serialization: 쿠키에 정보를 담는 작업 (주로, id)
- deserialization: 쿠키에 담겨있는 정보를 활용해 클라이언트의 정보로 전환하는 작업

- `npm install express-session`

#### (3) Passport JS

- 사용자 인증과 관련된 전반적인 기능을 구현해주는 미들웨어로, 쿠키 생성, 저장부터 쿠키를 받아 사용자 인증을 수행하고, 인증된 user object (`req.user`)를 controller 에 넘겨주는 등의 작업을 수행
- JS, MongoDB 를 사용하는 경우, `passport-local-mongoose` 모듈과 함께 사용하면 찰떡궁합
- **`req.user`** : passport를 사용하면 사용자가 로그인시 request에 해당 user 객체 정보를 추가해줌

```bash
npm install passport passport-local # passport-local: 서버 자체 db를 활용한 로그인 방식
npm install passport-local-mongoose
```

#### (4) Github 인증

- `npm install passport-github`
- github.com/settings/applications/new 에 앱 등록
- 깃헙 로그인 > 깃헙으로 redirection > 깃헙에서 사용자 권한 요청 > 권한 승인시 정보 전송
- 실제 과정
  - a 태그 href(route) (socialLogin.pug)
  - app.use(..., globalRouter) (app.js)
  - globalRouter.get(route, githubLogin) (globalRouter.js)
  - githubLogin = passport.authenticate("github"); (userController.js)
  - passport.use(new GithubStrategy(...) (passport.js)
  - 깃헙 페이지에서 권한 부여 > callbackURL
  - globalRouter.get(callbackURL, passport.authenticate("github", ...) postGithubLogIn) (globalRouter.js)
  - passport.authenticate 수행하면서 githubLoginCallback 수행 (passport.js)
  - githubLoginCallback (userController.js)
  - githubLoginCallback 에서 에러를 반환하지 않을 경우(`cb(null, user`)) **쿠키를 생성, 저장하며** globalRouter.get(callbackURL, ..., postGithubLogIn); 의 postGithubLogIn 수행 (userController.js)
  - home 화면으로 redirection

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
- 텍스트를 태그로 인식할 때는 텍스트 앞에 | 를 입력

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

- 사용자 입력 사항에 대한 응답

  - GET method

    - 입력 받기

      ```html
      <form action="[경로]" method="[get]">
        <!-- query에 접근하기 위해서는 get 방식이어야 함-->
        <input
          type="[유형]"
          name="[query로_전해질_때의_이름]"
        />
        <!-- url: `baseURL/경로?name=인풋값` -->
      </form>
      ```

    - 입력값 사용

      - 입력값은 `res.query` 에 저장됨
      - 컨트롤러에서 해당 값을 pug 에 전달

  - POST method

    - 입력 받기

      ```html
      <form action="[경로]" method="[post]">
        <input
          type="[유형]"
          name="[res.body 에 전달되는 이름]"
        />
      </form>
      ```

    - 입력값 사용
      - 입력값은 `res.body` 로 전송됨
      - **bodyparser** middleware 를 사용해야 `res.body` 로 정보를 전달받을 수 있음

##### mixin

- 브라우저 상에 반복되는 html 코드를 복/붙 하지 않고 재활용 할 수 있도록 구조화
- 다른 정보를 같은 구조에 넣어서 보여줘야 할 때 사용

```pug
mixin videoBlock(video = {})
  .videoBlock
    h1.videoBlock__title= video.title
```

- mixin에 인자가 입력되면 그 객체의 이름을 video라고 명명하고, 해당 객체의 title 을 받아 h1 태그에 사용

### 8) HTML

- label
  - input 선택영역의 확장

### 9) MongoDB

- [NoSQL](https://www.mongodb.com/nosql-explained)

#### (0) Fake DB (db.js)

- each elem in elems (in html)
  - 순회

#### (1) 초기설정

- [Guide](https://docs.mongodb.com/manual/installation/)

- [mongoDB](mongodb.com) - **community server** 다운로드

```bash
# 설치 # 공식 홈페이지에서 community server 다운로드도 가능
brew tap mongodb/brew
brew install mongodb-community@[버전]

# 설정
brew services start mongod-community@[버전] # to run MongoDB as a macOS service
ps aus | grep -v grep | grep mongod # to verify that MongoDB is running
mongo # to begin using MongoDB # exit

# connection between JS and MongoDB
npm install mongoose
```

```javascript
import mongoose
// MongoDB 와 JS 연결
mongoose.connect("mongodb://localhost:[port]/[database명]") // bash에서 mongo 접속하여 확인

const db = mongoose.connection
db.once("open", [callback func.])
```

#### (2) Model ("M"VC)

- MongoDB 는 json 파일로 document (data)를 저장

  - document 의 집합은 collection 이라고 부름

- schema & model
  - [schema](http://mongoosejs.com/docs/guide.html): 형식
  - model: schema 를 기반으로 하는 데이터

```javascript
const schema = new mongoose.Schema([딕셔너리 형태의 모델 형식 정의])
const model = mongoose.model("[모델명]", [schema 변수명])
```

- relationship of data

  - ex. 특정 비디오와 그에 대한 댓글

  - wetube clone 에서의 구현 가능성
    - (\*) 비디오에 댓글 아이디를 리스트로 저장
    - 댓글에 비디오 아이디를 저장
    - 객체 아이디의 타입은 `mongoose.Schema.Types.ObjectId`

#### (3) Upload 기능

- `multer` middleware 를 사용하여 **multipart/form-data**(form을 통해 파일을 등록, 전송시 웹브라우저가 보내는 http 메시지의 content-type 속성의 값) 을 핸들링
- flow

  - 파일 업로드시 해당 라우트에 post 방식으로 요청 전송
  - multer 를 통해 1. 서버상 정해진 경로에 파일이 저장되고, 2. form 의 text field 값을 저장하고 있는 body 객체와 파일에 대한 정보를 저자하고 있는 file 객체를 request 객체에 전달
  - 전달받은 정보를 MongoDB에 입력

- **multer configuration and usage**

```javascript
import multer from "multer";
const multerVideo = multer({ dest: "uploads/videos/" }); // 업로드할 파일의 저장 경로 설정

export const uploadVideo = multerVideo.single("videoFile"); // input 태그의 name 속성 값과 매치

// app 자체에서 업로드한 파일을 보여줄 수 있도록 multer 에서 지정한 경로에 접근 가능하도록 해줘야 함
app.use("/uploads", express.static("uploads")); // express.static : built-in 미들웨어로, 해당 디렉토리로 접근하여 파일을 살펴보도록 함
```

- **good practice 가 아님!!** : 서버와 동일한 경로에 자료를 보관하지 말 것!

#### (4) MongoDB 에 직접 접속해서 정보를 변경하기

```bash
mongo
# help : 도움말
show [db명]
use wetube_clone
show collections
db.[collection명].remove({}) # 삭제
```

#### (5) populate

```javascript
Video.findById(id)).populate('creator');
```

- 위와 같이 작성함으로써 Id 로 탐색한 오브젝트의 creator 필드에 대한 정보를 탐색할 수 있음
- `populate()` 는 `ObjectId` 타입에만 사용 가능

### 10) Linter

- 코드에 훈수두는 친구

```bash
npm install eslint -D
npm install eslint-config-prettier -D
eslint --init
```

module.exports = {
extends: ["airbnb-base", "plugin:prettier/recommended]
};

### 11) scss

- sass 파일에서는 `$` 기호를 변수명 앞에 붙여줌으로써 css 속성의 값을 변수로 선언할 수 있음
- css 파일에서 sass 파일에서 선언한 변수를 사용할 때 또한 `$`를 붙인 변수를 입력해야 함
- 부모-자식 관계에 있는 요소들의 스타일을 적용할 때, `html` 과 유사하게 트리 구조로 작성이 가능함

### 12) MediaDevices interface

- 장치에의 접근 권한 요청
  - 승인하는 순간부터 stream 객체를 얻게 됨
- `MediaRecorder(stream)` 을 통해 녹음/녹화 가능
  - 녹음/녹화가 종료되는 시점에 저장된 데이터(`blob`: 0과 1로 이루어진 데이터)에 접근 가능해짐 (`dataavailable` 이벤트 발생)
-

### Pages I need

- [] Home
- [] Join
- [] Login
- [x] Search
- [] User Deatail
- [] Edit Profile
- [] Change Password
- [x] Upload Video
- [x] Video Detail
- [x] Edit Video
