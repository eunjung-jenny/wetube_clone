import mongoose from "mongoose";

// 연결
mongoose.connect("mongodb://localhost:27017/wetube_clone"); // bash 창에서 mongo 로 접속하여 확인할 수 있는 port 번호/[database 이름]

const handleOpen = () => console.log("✅  Connected to DB");
const handleError = error =>
  console.log(`❌  Error on DB Connection: ${error}`);
// mongoose.connect("mongodb://localhost:27010/wetube_clone", {
//   useNewUrlParser: true,
//   useFindAndModify: false
// });

// MongoDB 와의 연결을 상수로 저장, export 하게 될 객체
const db = mongoose.connection;

// once: 한 번만 실행
db.once("open", handleOpen);
db.on("error", handleError);
