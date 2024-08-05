import { Router } from "express";
import { ContactUs } from "../Controllers/contactForm.js";

const contactFormRouter = Router();

contactFormRouter.post("/", ContactUs)

export default contactFormRouter;