import { Router } from "express";
import { checkEmail } from "../Middleware/CheckEmail.js";
import { createUser, updateUser} from "../Controllers/user.js";
import { login } from "../Controllers/auth.js";

const routerAuth = Router();

routerAuth.post("/signup", checkEmail,  createUser);

routerAuth.post("/login", login);

routerAuth.patch("/update/:email", updateUser);

export default routerAuth;