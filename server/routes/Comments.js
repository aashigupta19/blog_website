const express = require("express");
const { Comments } = require("../models");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddlewares");

router.get("/id/:postid", async (req, res) => {
  const id = req.params.postid;
  const comments = await Comments.findAll({ where: { postid: id } });
  res.json(comments);
});

router.post("/", validateToken, async (req, res) => {
  // we'll recieve the response in json format
  const comment = req.body;
  const user = req.user;
  comment.username = user.username;

  console.log("req.body: ", JSON.stringify(comment));
  await Comments.create(comment); // this will create/insert a row in the table in mysql
  // equivalent to: INSERT INTO comments VALUE( ...... );

  res.json(comment);
});

router.delete("/:commentid", validateToken, async (req, res) => {
  const id = req.params.commentid;
  console.log("commentid: ", id);
  try {
    await Comments.destroy({ where: { id: id } });
    // await Comments.delete({ where: { id: id } });

    res.json({ success: "comment deletion success" });
  } catch (err) {
    res.json({ error: err });
  }
});
module.exports = router;
