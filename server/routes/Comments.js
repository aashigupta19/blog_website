const express = require("express");
const { Comments } = require("../models");
const router = express.Router();

router.get("/id/:postid", async (req, res) => {
  const id = req.params.postid;
  const comments = await Comments.findAll({ where: { postid: id } });
  res.json(comments);
});

router.post("/", async (req, res) => {
  // we'll recieve the response in json format
  const comment = req.body;
  console.log("req.body: ", JSON.stringify(comment));
  await Comments.create(comment); // this will create/insert a row in the table in mysql
  // equivalent to: INSERT INTO POSTS VALUE( ...... );

  res.json(comment);
});

module.exports = router;
