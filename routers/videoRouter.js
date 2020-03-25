import express from "express";
import routes from "../routes";
import {
  getUpload,
  postUpload,
  videoDetail,
  getEditVideo,
  postEditVideo,
  deleteVideo
} from "../controllers/videoController";
import { uploadVideo, onlyPrivate } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get(routes.upload, onlyPrivate, getUpload);
// 파일 업로드시 uploadVideo 미들웨어를 통해 multer 에서 지정한 경로에 해당 파일은 저장하게 되고, postUpload 로 관련 정보를 보내주게 됨
videoRouter.post(
  routes.upload,
  onlyPrivate,
  uploadVideo,
  postUpload
);

videoRouter.get(routes.videoDetail(), videoDetail);
videoRouter.get(
  routes.editVideo(),
  onlyPrivate,
  getEditVideo
);
videoRouter.post(
  routes.editVideo(),
  onlyPrivate,
  postEditVideo
);
videoRouter.get(
  routes.deleteVideo(),
  onlyPrivate,
  deleteVideo
);

export default videoRouter;
