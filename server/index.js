const express = require("express");
const cors = require("cors");
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/Comments");
const usersRouter = require("./routes/Users");

// declarations
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const db = require("./models");

// app.post
// app.get

// Routing
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);
app.use("/auth", usersRouter);

// server start
db.sequelize.sync().then(() => {
  app.listen(4001, () => {
    console.log(`Server is running on port 4001 `);
  });
});

// write "type" : "module", inside package.json to use "import" in place of const

// import express from "express";
// import mysql from "mysql2";
// import cors from "cors";
// import defExp from "./encryptionHandle.js";
// const app = express();

// app.use(express.json());
// app.use(express.urlencoded());
// app.use(cors());
// const PORT = 5000;

// const db = mysql.createConnection({
//   user: "root",
//   host: "localhost",
//   password: "root1234",
//   database: "passwordsdb",
// });
