import { Router } from "express";
import { checkEmail } from "../Middleware/CheckEmail.js";
import { createUser,deleteUser, updateUser , obtainUserByEmail, searchUser, ObtainAllUsers} from "../Controllers/user.js";
import { isAuth, isAdmin } from "../Middleware/Auth.js";

const routerRequest = Router();


routerRequest.get("/", isAdmin, ObtainAllUsers);

routerRequest.get("/search/:term", isAdmin, searchUser);

routerRequest.get("/:email", obtainUserByEmail);

routerRequest.post("/create-user", checkEmail, createUser);

routerRequest.patch("/update/:email", isAuth, updateUser);

routerRequest.patch("/delete/:email", isAuth, isAdmin, deleteUser);


export default routerRequest;