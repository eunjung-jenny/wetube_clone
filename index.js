import express from "express";
//const express = require("express"); // 위 코드의 구버전 // babel을 사용하기 때문에 위 코드가 가능
const app = express();

const PORT = 4000;

const handleListening = () => {
  console.log(`Listening on: http://localhost:${PORT}`);
};

// 위 코드의 구버전 // babel을 사용하기 때문에 위 코드가 가능
// function handleListening() {
//   console.log(`Listening on: http://localhost:${PORT}`);
// }

const handleHome = (req, res) => {
  console.log(req);
  res.send("Hello from home!");
};

const handleProfile = (req, res) => {
  res.send("You are on my profile");
};

app.get("/", handleHome); // main URL

app.get("/profile", handleProfile);

app.listen(PORT, handleListening);
