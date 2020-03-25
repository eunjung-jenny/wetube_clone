import express from "express";
//const express = require("express"); // 위 코드의 구버전 // babel을 사용하기 때문에 위 코드가 가능
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
import { localsMiddleware } from "./middlewares";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";

import "./passport";

const app = express();

const CookieStore = MongoStore(session); // 세션을 db에 저장하기 위함

app.use(helmet());
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({
      mongooseConnection: mongoose.connection
    })
  })
); // secret: encoding/decoding 에 사용될 랜덤 문자열, store: 세션을 메모리가 아닌 db에 저장하여 서버가 재시작되거나 종료되더라도 세션이 유지되도록 함 (mongoose를 통해 저장소(CookieStore)를 mongoDB에 연결)
app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware); // local 변수를 global 변수로 사용 가능하게끔 하는 역할

// /user route 접속시 userRouter 전체를 사용함
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

// app 객체를 내보내기
export default app;
