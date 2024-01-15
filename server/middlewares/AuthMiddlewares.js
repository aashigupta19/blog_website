// grab the token in session storage
// see if its valid
// else don't allow request

const { verify } = require("jsonwebtoken");
const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.json({ error: "Please Login to continue" });

  try {
    const validToken = verify(accessToken, "importantsecret");
    req.user = validToken;
    if (validToken) return next();
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken };

// why doing this?? - read online
