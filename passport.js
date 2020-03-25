import passport from "passport";
import User from "./models/User";

// strategy: 어떠한 서버를 활용해서 사용자 인증을 진행할 것인가
passport.use(User.createStrategy()); // createStrategy() : local strategy

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
