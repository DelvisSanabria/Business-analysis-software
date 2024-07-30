import { Router } from "express";
import { checkEmail } from "../Middleware/CheckEmail";
import { UploadImage } from "../Middleware/UploadImage";
import { createUser, deleteUser, login, updateUser, uploadImage , obtainUserByEmail, searchUser, ObtainAllUsers} from "../Controllers/user";

const routerUser = Router();


routerUser.get("/", ObtainAllUsers);

routerUser.get("/search/:term", searchUser);

routerUser.get("/:email", obtainUserByEmail);

routerUser.post("/createUser", createUser);

routerUser.post("/signup", checkEmail,  createUser);

//borrar luego de usar de ejemplo para enterprises
routerUser.post("/uploadImage", UploadImage.upload.single("image"), uploadImage);

routerUser.post("/login", login);

routerUser.patch("/:email", upload.single("image"), updateUser);

routerUser.patch("/delete/:email", deleteUser);


export default routerUser;