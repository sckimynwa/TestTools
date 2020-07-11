import axios from "axios";

const token = "WlrhcU4Y_fv3NNvGcWd-YIE6dcmc_ojXC0AL5go9cpcAAAFzPNsYuA";
const options = {
  headers: {
    Authorization: `Bearer ${token}`
  }
};

// Get User Information
async function getMe() {
  const data = await axios.get("https://kapi.kakao.com/v2/user/me", options);
  return data;
}

// post Message for Myself
async function postMessageForMe() {
  const data = await axios.post(
    "https://kapi.kakao.com/v2/api/talk/memo/default/send",
    {
      template_id: 32355
    },
    options
  );
  return data;
}

postMessageForMe().then(res => console.log(res));
