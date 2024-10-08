const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  // Fetch the token from the request header
  const token = req.headers?.authorization?.split(" ")?.[1];
  console.log("token: ", token);

  // Throw an error if the token is not present.
  if (!token) {
    res.status(401).json({ error: "Unauthorized, Token not Found." });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("decodedToken", decodedToken);

    req.userData = decodedToken;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid token." });
  }
};

function generateToken(userData) {
  // To generate a new token.
  return jwt.sign(userData, process.env.JWT_SECRET_KEY, {
    expiresIn: "28 days",
  });
}

module.exports = { jwtAuthMiddleware, generateToken };
