import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({
      createdAt: -1
    });
    // throw Error("lala");
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(`❌  ${error}`);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};
// catch (error) {
//   console.log(error);
//   res.render("home", { pageTitle: "Home", videos: [] });
// }};

export const search = async (req, res) => {
  const {
    query: { term: searchingBy }
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" }
    });
  } catch (e) {
    console.log(e);
  }
  res.render("search", {
    pageTitle: "Search",
    searchingBy,
    videos
  });
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path }
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    creator: req.user._id
  });
  req.user.video.push(newVideo._id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo._id));
  // res.render("upload", { pageTitle: "Upload" });
};

export const videoDetail = async (req, res) => {
  // routes 에서 /:id 로 변수라는 표시를 해놨기 때문에 req.params 에 id 로 전달이 됨
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id).populate(
      "creator"
    );
    res.render("videoDetail", {
      pageTitle: video.title,
      video
    });
  } catch (e) {
    console.log(e);
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    if (String(video.creator) !== String(req.user.id)) {
      throw Error();
    } else {
      res.render("editVideo", {
        pageTitle: `Edit ${video.title}`,
        video
      });
    }
  } catch (e) {
    // console.log(e);
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description }
  } = req;
  try {
    await Video.findOneAndUpdate(
      { _id: id },
      { title, description }
    );
    res.redirect(routes.videoDetail(id));
  } catch (e) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    if (String(video.creator) !== String(req.user.id)) {
      throw Error();
    } else {
      await Video.findOneAndRemove({ _id: id });
    }
  } catch (e) {
    console.log(e);
  }
  res.redirect(routes.home);
  res.render("deleteVideo", { pageTitle: "Delete Video" });
};

// Register Video View

export const postRegisterView = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
    res.end();
  }
};
