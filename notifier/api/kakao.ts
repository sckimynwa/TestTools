import axios from "axios";

// Auth Settings
const baseURL = "https://kapi.kakao.com";
const token = "pHUVaON2FjzogE9rRLU-L5OhECFUBJn79JIsRAo9dNkAAAFzQwLIcg";
const headers = {
  Authorization: `Bearer ${token}`,
  "content-type": "application/x-www-form-urlencoded"
};

// Get User Information
export async function getMe() {
  return await axios({
    method: "GET",
    baseURL,
    url: "/v2/user/me",
    headers
  });
}

// post Message for User
export async function postMessage(id: string) {
  return await axios({
    method: "POST",
    baseURL,
    url: "/v1/api/talk/friends/message/default/send",
    headers,
    params: {
      receiver_uuids: id,
      // change to variable template next time
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
}

// post Message for Myself
export async function postMessageForMe() {
  return await axios({
    method: "POST",
    baseURL,
    url: "/v2/api/talk/memo/default/send",
    headers,
    params: {
      // change to variable template next time
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
}

// getMe().then(res => console.log(res.data));
// postMessageForMe().then(
//   res => {
//     console.log(res);
//   },
//   err => {
//     console.log(err);
//   }
// );
