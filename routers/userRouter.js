import express from "express";
import routes from "../routes";
import {
  userDetail,
  editProfile,
  changePassword
} from "../controllers/userController";
import { onlyPrivate } from "../middlewares";

// 해당 변수만 내보내기
const userRouter = express.Router();

// userRouter.get(routes.users, users);
userRouter.get(
  routes.editProfile,
  onlyPrivate,
  editProfile
);
userRouter.get(
  routes.changePassword,
  onlyPrivate,
  changePassword
);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
