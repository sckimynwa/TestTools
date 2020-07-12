// import express from "express";
// import bodyParser from "body-parser";
var express = require("express");
var bodyParser = require("body-parser");
var PORT = 3000;
var app = express();
// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// Login & auth/callback
"https://kauth.kakao.com/oauth/authorize?client_id=7a4115347e2a49fa0ddb503c2036f328&redirect_uri=http://localhost:3000&response_type=code";
app.get("/", function (req, res) {
    console.log("auth/callback accessed");
    console.log(req);
    res.send("hello world");
});
app.listen(PORT, function () {
    console.log("LISTENING PORT 3000");
});
