import { config } from "dotenv";
config({ path: '../Config/.env' });
import mongoose from "mongoose";
import { User } from "../Models/user.js";
import { SavedRequest } from "../Models/savedRequest.js";
import { generateAnalysis } from "../Middleware/RequestOpenAI.js";

export const getRequests = async (req, res) => {
  const {companyName, field, country, city, description} = req.body;

  const query = {companyName, field, country, city, description};

  if (!companyName && !field && !country && !city && !description) {
    return res.status(400).json({message: "All fields are required"});
  }else if (companyName && !field && !country && !city && !description) {
    return res.status(200).json(generateAnalysis(query));
  }
}