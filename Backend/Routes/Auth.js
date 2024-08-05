import { Router } from "express";
import { checkEmail } from "../Middleware/CheckEmail.js";
import { createUser} from "../Controllers/user.js";
import { login } from "../Controllers/auth.js";

const routerAuth = Router();

routerAuth.post("/signup", checkEmail,  createUser);

routerAuth.post("/login", login);

export default routerAuth;