import express from "express";
import routes from "../routes";
import passport from "passport";
import {
  home,
  search
} from "../controllers/videoController";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
  githubLogin,
  postGithubLogIn,
  getMe
} from "../controllers/userController";
import { onlyPublic, onlyPrivate } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(
  routes.join,
  onlyPublic,
  postJoin,
  postLogin
);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.gitHub, githubLogin);
globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", {
    failureRedirect: routes.login
  }),
  postGithubLogIn
);

globalRouter.get(routes.me, getMe);

globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.search, search);

export default globalRouter;
