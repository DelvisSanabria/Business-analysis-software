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

SavedRequestRouter.get("/", isAuth, isAdmin, obtainAllSavedRequest);

SavedRequestRouter.post("/saveRequest", isAuth, newSavedRequest);

SavedRequestRouter.get("/search/:term",isAuth, searchSavedRequest);

SavedRequestRouter.patch("/update/:id", isAuth, updateSavedRequest);

SavedRequestRouter.get("/searchRequest/:id", isAuth, searchRequestByID);

SavedRequestRouter.patch("/delete/:id", isAuth, isAdmin, deleteSavedRequest);

export default SavedRequestRouter;