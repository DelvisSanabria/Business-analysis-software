import { Router } from "express";
import { checkEmail } from "../Middleware/CheckEmail.js";
import { createUser,deleteUser, updateUser , obtainUserByEmail, searchUser, ObtainAllUsers} from "../Controllers/user.js";
import { isAuth, isAdmin } from "../Middleware/Auth.js";

const routerUser = Router();


routerUser.get("/", isAdmin, ObtainAllUsers);

routerUser.get("/search/:term", isAdmin, searchUser);

routerUser.get("/:email", obtainUserByEmail);

routerUser.post("/create-user", checkEmail, createUser);

routerUser.patch("/update/:email", isAuth, updateUser);

routerUser.patch("/delete/:email", isAuth, isAdmin, deleteUser);


export default routerUser;