import express from "express";

// 해당 변수만 내보내기
export const userRouter = express.Router();

userRouter.get("/", (req, res) => res.send("user index"));
userRouter.get("/edit", (req, res) =>
  res.send("user edit")
);
userRouter.get("/password", (req, res) =>
  res.send("user password")
);
