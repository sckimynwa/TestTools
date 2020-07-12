import express from "express";
import bodyParser from "body-parser";

const PORT = 3000;
const app = express();
// middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.listen(PORT, () => {
  console.log("LISTENING PORT 3000");
});
