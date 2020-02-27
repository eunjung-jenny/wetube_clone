import express from "express";
import routes from "../routes";
import {
  users,
  userDetail,
  editProfile,
  changePassword
} from "../controllers/userController";

// 해당 변수만 내보내기
const userRouter = express.Router();

// userRouter.get(routes.users, users);
userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassword, changePassword);
userRouter.get(routes.userDetail, userDetail);

export default userRouter;
