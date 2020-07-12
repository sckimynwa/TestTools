import axios from "axios";

// Auth Settings
const baseURL = "https://api.football-data.org/v2";
const token = "99d4f97157344df5a259426ae6c25590";
const headers = {
  "X-Auth-Token": `${token}`
};

export async function getTeamsInfo() {
  return await axios({
    method: "GET",
    url: "/competitions/2000/teams",
    baseURL,
    headers
  });
}
