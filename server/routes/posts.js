const express = require("express");
const { Posts } = require("../models");
const router = express.Router();

router.get("/", async (req, res) => {
  const postList = await Posts.findAll();
  res.json(postList);
});

router.get("/id/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  res.json(post);
});

router.post("/", async (req, res) => {
  // we'll recieve the response in json format with "title", "content", "author"
  const post = req.body;
  console.log("req.body: ", JSON.stringify(post));
  await Posts.create(post); // this will create/insert a row in the table in mysql
  // equivalent to: INSERT INTO POSTS VALUE( ...... );

  res.json(post);
});

module.exports = router;
