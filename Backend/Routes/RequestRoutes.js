import { Router } from "express";
import { isAuth, isPayUser } from "../Middleware/Auth.js";
import { getRequests } from "../Controllers/requests.js";


const routerRequest = Router();


routerRequest.post("/", isAuth, isPayUser, getRequests );

export default routerRequest;