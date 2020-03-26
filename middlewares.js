import routes from "./routes";
import multer from "multer";

const multerVideo = multer({ dest: "uploads/video/" });
// 업로드한 파일을 서버에 있는 videos 폴더에 저장
// "/videos/" 와 같이 작성시 (맨 앞 슬래시) 루트 폴더부터 시작되는 경로에 저장하게 됨

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

export const uploadVideo = multerVideo.single("videoFile"); // form 의 name 속성과 매치
