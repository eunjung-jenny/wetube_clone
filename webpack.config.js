// path : nodeJS built-in package : 절대경로 생성
const path = require("path");
const autoprefixer = require("autoprefixer");
const ExtractCSS = require("extract-text-webpack-plugin");

const MODE = process.env.WEBPACK_ENV;

// __dirname: 프로젝트 디렉토리
const ENTRY_FILE = path.resolve(
  __dirname,
  "assets",
  "js",
  "main.js"
);
const OUTPUT_DIR = path.join(__dirname, "static");

// mode: production : 코드 압축됨. dev : 코드 압축되지 않음, 에러 디텍팅 위해서
const config = {
  entry: ["@babel/polyfill", ENTRY_FILE], // npm install @babel/polyfill
  mode: MODE,
  // module 을 만났을 때 다음과 같은 규칙을 따르면서 변환시키도록 함
  module: {
    // (test)지정한 파일을 만났을 때 지정한 loader 를 따라 파일을 다루면 됨
    rules: [
      {
        test: /\.(js)$/,
        use: [{ loader: "babel-loader" }] // npm install babel-loader
      },
      {
        // scss 파일이면 1. scss -> css 2. css 텍스트 추출 3. css 파일로 저장 // loader 를 작성할 때는 역순으로 작성해야 함
        test: /\.(scss)$/,
        // 다음을 사용
        // npm install extract-text-webpack-plugin@next // @ 을 쓰면 특정 버전을 지정해서 설치할 수 있음
        use: ExtractCSS.extract([
          // npm install css-loader postcss-loader sass-loader
          { loader: "css-loader" }, // css 텍스트 추출
          {
            loader: "postcss-loader",
            options: {
              plugins() {
                return [
                  autoprefixer({
                    overrideBrowserslist: ["cover 99.5%"]
                  })
                ];
              }
            }
          }, // 호환성(브라우저 간 등)을 가질 수 있도록 변환 https://postcss.org autoprefixer // npm install autoprefixer // https://github.com/postcss/autoprefixer
          { loader: "sass-loader" } // sass -> css
        ])
      }
    ]
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js"
  },
  // npm install node-sass
  // new ExtractCSS(파일명)
  plugins: [new ExtractCSS("styles.css")]
};

module.exports = config;
