import express from "express";
import routes from "../routes";

// 해당 변수만 내보내기
const userRouter = express.Router();

userRouter.get(routes.users, (req, res) =>
  res.send("Users")
);
userRouter.get(routes.userDetail, (req, res) =>
  res.send("User Detail")
);
userRouter.get(routes.editProfile, (req, res) =>
  res.send("Edit Profile")
);
userRouter.get(routes.changePassword, (req, res) =>
  res.send("Change Password")
);

export default userRouter;
