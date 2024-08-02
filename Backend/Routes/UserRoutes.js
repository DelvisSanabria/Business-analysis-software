import { Router } from "express";
import { checkEmail } from "../Middleware/CheckEmail";
import { UploadImage } from "../Middleware/UploadImage";
import { createUser,deleteUser, updateUser, uploadImage , obtainUserByEmail, searchUser, ObtainAllUsers} from "../Controllers/user";
import { isAuth, isAdmin } from "../Middleware/Auth";

const routerUser = Router();


routerUser.get("/", isAdmin, ObtainAllUsers);

routerUser.get("/search/:term", isAdmin, searchUser);

routerUser.get("/:email", obtainUserByEmail);

routerUser.post("/createUser", checkEmail, createUser);

routerUser.patch("/:email", isAuth, updateUser);

routerUser.patch("/delete/:email", isAuth, isAdmin, deleteUser);


export default routerUser;