import dotenv from "dotenv";
dotenv.config();
import express, { json } from "express";
// import { urlencoded, json as _json } from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";

// import connectdb from "./configs/database.js";
// connectdb.connect();
import connectDB from "./configs/database.js";

connectDB();
const __dirname = path.resolve();
console.log(__dirname);
const app = express();
app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin,X-Requested-With,Content-Type,Accept,Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,PATCH,DELETE,PUT,OPTIONS"
    );
    if (req.method === "OPTIONS") {
      res.sendStatus(200);
    } else {
      next();
    }
  });
  
//middleware
app.use(json());
// app.use(urlencoded({ extended: true }));
// app.use(_json());
app.use(helmet());
app.use(morgan("common"));

import login from "./routes/user.js";
import anime from "./routes/anime.js";
app.use("/", login);
app.use("/anime", anime);
// app.use("/",address);
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});