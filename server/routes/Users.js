const express = require("express");
const { Users } = require("../models");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  // we'll recieve the response in json format for registration

  const { username, password } = req.body;

  //   we have to encrypt the password first before storing in mysql
  //   console.log("req.body: ", JSON.stringify(user));

  bcrypt.hash(password, 12).then(async (hash) => {
    const user = {
      username: username,
      password: hash,
    };

    await Users.create(user);
    res.json(user);
  });
  // this will create/insert a row in the table in mysql
  // equivalent to: INSERT INTO Users VALUE( ...... );
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // first find username exists or not
  // if yes, then:
  // retreive corresponding password -> decrypt it -> then compare it woth password entered on UI
  //if no, then
  // username or password is incorrect, pls try again

  const user = await Users.findOne({ where: { username: username } });
  if (user) {
    // decryption
    bcrypt.compare(password, user.password).then((auth) => {
      if (!auth) res.json({ error: "username or password is incorrect" });
      else res.json({ success: "Successfull login" });
    });
  } else {
    res.json({ error: "User doesn't exist" });
  }
});

module.exports = router;
