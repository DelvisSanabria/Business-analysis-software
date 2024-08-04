import { config } from "dotenv";
config({ path: '../Config/.env' });
import mongoose from "mongoose";
import { User } from "../Models/user.js";
import { SavedRequest } from "../Models/savedRequest.js";

export const getRequests = async (req, res) => {

}