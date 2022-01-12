const jwt = require("jsonwebtoken");

//verify jwt token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader;
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) {
        res.status(403).json("Token is not valid!");
      }

      req.user = user;

      next();
    });
  } else {
    return res.status(401).json("Your are not authentiated!");
  }
};

//authorized user and verifyToken
const verifyTokenAndAuthorized = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("You are not allowed to do this action!");
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAuthorized };
