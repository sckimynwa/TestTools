import express from "express";
import mongoose from "mongoose";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema/schema";

const app = express();
mongoose.connect("mongodb://localhost:27017/graphql-server", {
  useNewUrlParser: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("connected to database");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
