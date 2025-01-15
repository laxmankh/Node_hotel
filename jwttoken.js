const jwt = require("jsonwebtoken");

//extract the jwt token from request headers
const jwtauthmiddleware = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "token not found" });
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "invalid token" });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "invalid token" });
  }
};

//generate the token
const generatetoken = (userdata) => {
  return jwt.sign(userdata, process.env.JWT_SECRET);
};
module.exports = { jwtauthmiddleware, generatetoken };
