const jwt = require("jsonwebtoken");

const attachTokenMiddleware = (req, res, next) => {
  const token = req.headers.authorization; // Assuming the token is passed in the Authorization header
  const splitedCookie = token.split("Bearer ")[1];
  if (splitedCookie) {
    try {
      const decodedToken = jwt.verify(splitedCookie, "geo-app"); // Replace with your secret key
      req.userId = decodedToken.userId; // Attach the user ID to the request
    } catch (error) {
      // Token verification failed, reject the request
      return res.status(403).json({ message: "Token verification failed" });
    }
  }

  next(); // Proceed to the next middleware or route
};

module.exports = attachTokenMiddleware;
