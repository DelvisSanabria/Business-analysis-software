import { config } from "dotenv";
config({ path: '../Config/.env' });
import { User } from "../Models/user.js";;
import bcrypt from "bcryptjs";
import { generateToken } from "../Middleware/Auth.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = generateToken(user);
        return res.status(200).json({user,token});
      } else {
        return res.status(406).json({ password: "Wrong password" });
      }
    } else {
      return res.status(404).json({ email: "Unregistered mail" });
    }
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
    return res.status(500).json({ name: error.name, message: error.message });
  }
};

