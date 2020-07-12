"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
// Auth Settings
var baseURL = "https://api.football-data.org/v2";
var token = "99d4f97157344df5a259426ae6c25590";
var headers = {
    "X-Auth-Token": "" + token
};
axios_1["default"]({
    method: "GET",
    url: "/competitions/2000/teams",
    baseURL: baseURL,
    headers: headers
}).then(function (res) { return console.log(res.data); });
