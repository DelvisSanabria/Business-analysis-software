import { Router } from "express";
import { checkKeys } from "../Middleware/CheckKey.js";
import { keyValidation, sendRecoveryCode } from "../Controllers/EmailSender.js";
import { checkExistEmail } from "../Middleware/CheckEmail.js";

const emailRouter = Router();


emailRouter.post("/sendRecoveryCode",checkExistEmail, checkKeys, sendRecoveryCode);

emailRouter.post("/codeValidation", keyValidation);

export default emailRouter;