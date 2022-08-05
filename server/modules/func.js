const jwt = require("jsonwebtoken");
const InvalidToken = require("../db/invalidTokenModel");
const dotenv = require("dotenv");

dotenv.config();

const functions = {
  generateSecret: () => {
    return require("crypto").randomBytes(64).toString("hex");
  },

  async authenticateToken(req, res, next) {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];

      if (token == null) return res.sendStatus(401);

      jwt.verify(token, process.env.TOKEN_SECRET, async (err) => {
        if (err) {
          /* Check Expired Token and Generate a new one if received is last known token */
          return res.status(401).send({ message: "Invalid Token", error: err });
        }

        try {
          const tokenDoc = await InvalidToken.findOne({ token: token });
          if (tokenDoc != null) {
            console.log(tokenDoc);
            return res.status(401).send({ message: "Invalid Token" });
          }
        } catch (err) {
          return "error occured";
        }

        next();
        return;
      });
      return;
    } catch (err) {
      console.log(err);
      return;
    }
  },
};

module.exports = functions;
