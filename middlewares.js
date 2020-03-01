import routes from "./routes";
import multer from "multer";

const multerVideo = multer({ dest: "videos/" });
// 업로드한 파일을 서버에 있는 videos 폴더에 저장

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: 1
  };
  next();
};

export const uploadVideo = multerVideo.single("videoFile"); // form 의 name 속성과 매치
