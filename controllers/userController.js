import routes from "../routes";
import User from "../models/User";
import passport from "passport";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 }
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({
        name,
        email
      }); // User.create 을 해버리면 register 되기 이전에 db에 저장이 되어버려서 오류가 발생하게 됨
      await User.register(user, password); // passport-local-mongoose 의 createStrategy 메서드를 수행한 뒤 User 모델에 제공되는 메서드
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home
}); // passport.authenticate() 은 usernameField 와 password 를 찾아보게끔 설정되어 있음

export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (
  _,
  __,
  profile,
  cb
) => {
  const {
    _json: { id, avatar_url, name, email }
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user); // cb(err, user) 에서 err 를 보내지 않으면 성공적으로 수행되었다는 의미
    }
    const newUser = await User.create({
      email: email,
      name: name,
      githubId: id,
      avatarUrl: avatar_url
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogIn = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const getMe = (req, res) => {
  res.render("userDetail", {
    pageTitle: "User Detail",
    user: req.user
  });
};

export const userDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const user = await User.findById(id);
    res.render("userDetail", {
      pageTitle: "User Detail",
      user
    });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file
  } = req;
  try {
    await User.findByIdAndUpdate(req.user._id, {
      name: name,
      email: email,
      avatarUrl: file ? file.path : req.user.avatarUrl
    });
    res.redirect(routes.me);
  } catch (errer) {
    res.render("editProfile", {
      pageTitle: "Edit Profile"
    });
  }
};

export const changePassword = (req, res) =>
  res.render("changePassword", {
    pageTitle: "Change Password"
  });
