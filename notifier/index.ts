// import express from "express";
// import bodyParser from "body-parser";
const express = require("express");
const bodyParser = require("body-parser");

const PORT = 3000;
const app = express();
// middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// Login & auth/callback
app.get("/auth/callback", (req: any, res: any) => {
  console.log("auth/callback accessed");
  console.log(req);
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log("LISTENING PORT 3000");
});
