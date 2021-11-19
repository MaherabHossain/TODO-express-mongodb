const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const { username, id } = decoded;
    req.username = username;
    req.userId = id;
    next();
  } catch {
    res.status(401).json({
      error: "Auth failed!",
    });
  }
};

module.exports = checkLogin;
