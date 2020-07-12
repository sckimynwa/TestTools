import axios from "axios";

// Auth Settings
const token = "pHUVaON2FjzogE9rRLU-L5OhECFUBJn79JIsRAo9dNkAAAFzQwLIcg";
const headers = {
  Authorization: `Bearer ${token}`,
  "content-type": "application/x-www-form-urlencoded"
};

// Get User Information
async function getMe() {
  const data = await axios({
    method: "GET",
    url: "https://kapi.kakao.com/v2/user/me",
    headers
  });
  return data;
}

// post Message for Myself
async function postMessageForMe() {
  const data = await axios({
    method: "POST",
    url: "https://kapi.kakao.com/v2/api/talk/memo/default/send",
    headers,
    data: {
      template_object: {
        object_type: "text",
        text: "sample text",
        link: {
          web_url: "https://www.naver.com",
          mobile_web_url: "https://www.naver.com"
        },
        button_title: "sample button"
      }
    }
  });
  return data;
}

// getMe().then(res => console.log(res.data));
postMessageForMe().then(
  res => {
    console.log(res);
  },
  err => {
    console.log(err);
  }
);
