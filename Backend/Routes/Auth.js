import { Router } from "express";
import { checkEmail } from "../Middleware/CheckEmail";
import { createUser} from "../Controllers/user";
import { login } from "../Controllers/auth";

const routerAuth = Router();

routerAuth.post("/signup", checkEmail,  createUser);

routerAuth.post("/login", login);

export default routerAuth;