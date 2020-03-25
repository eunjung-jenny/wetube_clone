import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  emain: String,
  avatarUrl: String,
  facebookId: Number,
  githubId: Number
});

UserSchema.plugin(passportLocalMongoose, {
  usernameField: "email"
}); // email 이 username 으로 활용하여 passportLocalMongoose 를 사용할 것이다.

const model = mongoose.model("User", UserSchema);

export default model;
