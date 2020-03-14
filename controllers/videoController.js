import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
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

export const search = (req, res) => {
  const {
    query: { term: searchingBy }
  } = req;
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
    description
  });
  console.log(newVideo);
  res.redirect(routes.videoDetail(newVideo.id));
  // res.render("upload", { pageTitle: "Upload" });
};

export const videoDetail = async (req, res) => {
  // routes 에서 /:id 로 변수라는 표시를 해놨기 때문에 req.params 에 id 로 전달이 됨
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    console.log(video);
    res.render("videoDetail", {
      pageTitle: "Video Detail",
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
    res.render("editVideo", {
      pageTitle: `Edit ${video.title}`,
      video
    });
  } catch (e) {
    console.log(e);
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

export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete Video" });
