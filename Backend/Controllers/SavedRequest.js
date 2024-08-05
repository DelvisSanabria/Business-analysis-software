import { config } from "dotenv";
config({ path: '../Config/.env' });
import mongoose from "mongoose";
import { SavedRequest } from "../Models/savedRequest.js";
import { User } from "../Models/user.js";

export const obtainAllSavedRequest = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 6,
      sort: { createdAt: -1 },
      customLabels: { docs: "savedRequest", totalDocs: "count" }
    };
    let query = { deleted: false };
    let savedRequest = await SavedRequest.paginate(query, options);

    res.status(201).json(savedRequest);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const searchSavedRequest = async (req, res) => {
  const ObjectId = mongoose.Types.ObjectId;
  try {
    const term = req.params.term;

    let filteredSavedRequest;
    if (ObjectId.isValid(term)) {
      filteredSavedRequest = await SavedRequest.find({ _id: new ObjectId(term) });
    } else {
      const regex = new RegExp(term, 'i');
      filteredSavedRequest = await SavedRequest.find({
        $or: [
          { user: { $regex: regex } },
          { enterprise: { $regex: regex } },
        ],
      });
    }

    res.status(200).json(filteredSavedRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const searchRequestByID = async (req, res) => {
  try {
    let request = await SavedRequest.findOne({ _id: req.params.id });
    res.status(201).json(request);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


export const newSavedRequest = async (req, res) => {
  try {
    const userObject = new mongoose.Types.ObjectId(req.body.user);
    const enterpriseObject = new mongoose.Types.ObjectId(req.body.enterprise);
    let savedRequest = new SavedRequest({ ...req.body, user: userObject, enterprise: enterpriseObject });
    await savedRequest.save();

    await User.findByIdAndUpdate(userObject, {
      $push: { savedRequests: savedRequest._id }
    });

    res.status(201).json(savedRequest);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


export const updateSavedRequest = async (req, res) => {
  try {
    const requestID = req.params.id;
    const newData = req.body;
    const request = await SavedRequest.findOne({ _id: requestID });
    if (!request) {
      return res
        .status(404)
        .json({ message: "no saved query found associated with the provided ID" });
    }

    let update = { $set: {} };

    if (newData.user) {
      update.$set.user = new mongoose.Types.ObjectId(newData.user);
    }
    if (newData.enterprise) {
      update.$set.enterprise = new mongoose.Types.ObjectId(newData.enterprise);
    }
    if (newData.data) {
      if (Array.isArray(newData.data)) {
        update.$set.data = newData.data.map(item => ({
          ...item
        }));
      } else {
        return res.status(400).json({ message: "Data should be an array of objects" });
      }
    }
    const updated = await SavedRequest.findOneAndUpdate({ _id: requestID }, update, {
      new: true,
    });
    res.status(201).json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteSavedRequest= async (req, res) => {
  try {
    const requestID = req.params.id;

    try {
      const updated = await SavedRequest.findOneAndUpdate({ _id: requestID }, { deleted: true }, { new: true });

      if (!updated) {
        return res.status(404).json({ message: 'Saved Request not was updated' });
      }

      res.status(201).json(updated);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};