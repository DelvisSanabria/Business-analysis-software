import { Router } from "express";

import {
  newSavedRequest,
  searchSavedRequest,
  updateSavedRequest,
  deleteSavedRequest,
  searchRequestByID,
  obtainAllSavedRequest,
} from "../Controllers/SavedRequest.js";

import { isAdmin, isAuth } from "../Middleware/Auth.js";

const SavedRequestRouter = Router();

SavedRequestRouter.get("/allsavedRequest", isAuth, isAdmin, obtainAllSavedRequest);

SavedRequestRouter.get("/saveRequest", isAuth, newSavedRequest);

SavedRequestRouter.get("/searchRequest",isAuth, searchSavedRequest);

SavedRequestRouter.get("/updateSavedRequest/:id", isAuth, updateSavedRequest);

SavedRequestRouter.get("/searchRequest/:id", isAuth, searchRequestByID);

SavedRequestRouter.get("/deleteSavedRequest/:id", isAuth, isAdmin, deleteSavedRequest);

export default SavedRequestRouter;