import { Router } from "express";
import { checkEmail } from "../Middleware/CheckEmail";
import { UploadImage } from "../Middleware/UploadImage";
import { createEnterprise,deleteEnterprise, updateEnterprise, uploadImage , obtainEnterpriseByID, searchEnterprise, ObtainAllEnterprises} from "../Controllers/enterprise";
import { isAuth, isAdmin } from "../Middleware/Auth";

const routerUser = Router();


routerUser.get("/", isAuth, isAdmin, ObtainAllEnterprises);

routerUser.get("/search/:term", isAuth, isAdmin, searchEnterprise);

routerUser.get("/:id", obtainEnterpriseByID);

routerUser.post("/createUser", checkEmail, createEnterprise);

routerUser.post("/uploadImage", UploadImage.upload.single("logo"), uploadImage);

routerUser.patch("/:id", isAuth, upload.single("logo"), updateEnterprise);

routerUser.patch("/delete/:id", isAuth, isAdmin, deleteEnterprise);


export default routerUser;