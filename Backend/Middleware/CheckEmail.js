import { config } from "dotenv";
config({ path: '../Config/.env' });
import { User } from "../Models/user.js";

export const checkEmail = (req, res, next) => {
  const { email } = req.body;
  User.findOne({ email: email })
    .then(user => {
      if (user) {
        return res.status(409).json({ email: "this email already exists" });
      }
      else {
        next();
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "An error occurred while verifying the email" });
    });
};