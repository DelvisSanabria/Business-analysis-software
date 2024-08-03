import { Router } from "express";
import { checkEmail } from "../Middleware/CheckEmail.js";
import { upload } from "../Middleware/UploadImage.js";
import { createEnterprise,deleteEnterprise, updateEnterprise, uploadImage , obtainEnterpriseByID, searchEnterprise, ObtainAllEnterprises} from "../Controllers/enterprise.js";
import { isAuth, isAdmin } from "../Middleware/Auth.js";

const routerEnterprise = Router();


routerEnterprise.get("/", isAuth, isAdmin, ObtainAllEnterprises);

routerEnterprise.get("/search/:term", isAuth, isAdmin, searchEnterprise);

routerEnterprise.get("/:id",isAuth, obtainEnterpriseByID);

routerEnterprise.post("/createEnterprise", checkEmail, createEnterprise);

routerEnterprise.post("/uploadImage/:id",isAuth, upload.single("image"), uploadImage);

routerEnterprise.patch("/update/:id", isAuth, upload.single("image"), updateEnterprise);

routerEnterprise.patch("/delete/:id", isAuth, isAdmin, deleteEnterprise);


export default routerEnterprise;