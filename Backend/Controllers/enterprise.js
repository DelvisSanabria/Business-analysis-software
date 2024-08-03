import { config } from "dotenv";
config({ path: '../Config/.env' });
import mongoose from "mongoose";
import { Enterprise } from "../Models/enterprise.js";;
import fs from "fs";


const domain = process.env.DOMAIN || "http://localhost:3001";

const ObjectId = mongoose.Types.ObjectId;

export const ObtainAllEnterprises = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 6,
      sort: { createdAt: -1 },
      customLabels: { docs: "enterprises", totalDocs: "count" }
    };
    let query = { deleted: false };
    let enterprises = await Enterprise.paginate(query, options);

    res.status(200).json(enterprises);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


export const searchEnterprise = async (req, res) => {
  const ObjectId = mongoose.Types.ObjectId;
  try {
    const term = req.params.term;

    let filteredEnterprises;
    if (ObjectId.isValid(term)) {
      filteredEnterprises = await Enterprise.find({ _id: new ObjectId(term) });
    } else {
      const regex = new RegExp(term, 'i');
      filteredEnterprises = await Enterprise.find({
        $or: [
          { name: { $regex: regex } },
          { fieldOfWork: { $regex: regex } },
          { country: { $regex: regex } },
          { city: { $regex: regex } },
        ]
      });
    }

    res.status(200).json(filteredEnterprises);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


export const obtainEnterpriseByID = async (req, res) => {
  try {
    let enterprise = await Enterprise.findOne({ _id: req.params.id });
    res.status(201).json(enterprise);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


export const createEnterprise = async (req, res) => {
  try {
    const userObject = new mongoose.Types.ObjectId(req.body.user);
    let enterprise = new Enterprise({ ...req.body, user: userObject });
    await enterprise.save();
    res.status(201).json(enterprise);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const uploadImage = async (req, res) => {
  try {
    let enterprise = await Enterprise.findById(req.params.id);
    if (!enterprise) {
      return res.status(404).json({ enterprise: "Company Not Found Unable to Update Image" });
    }
    if (req.file) {
      enterprise.logo = `${domain}/images/enterprises/${req.file.filename}`;
      await enterprise.save();
    }
    return res.status(200).json(enterprise);
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
    return res.status(500).json({ name: error.name, message: error.message });
  }
};

export const updateEnterprise = async (req, res) => {
  try {
    const enterpriseID = req.params.id;
    const newData = req.body;
    const enterprise = await Enterprise.findOne({ _id: enterpriseID });
    if (!enterprise) {
      return res
        .status(404)
        .json({ message: "no saved company found associated with the provided ID" });
    }
    const imagePath = req.file ? req.file.path : undefined;

    let update = { $set: {} };

    if (imagePath) {
      update.$set.logo = `${domain}/${imagePath}`;
      const startIndex = enterprise.logo.indexOf("images");
      const logoFilePathPrev = enterprise.logo.substring(startIndex);
      const filePath = logoFilePathPrev
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log("Deleted file:", filePath);
      } else {
        console.log("The file does not exists:", filePath);
      }
    }
    if (newData.name) {
      update.$set.name = newData.name;
    }
    if (newData.fieldOfWork) {
      update.$set.fieldOfWork = newData.fieldOfWork;
    }
    if (newData.country) {
      update.$set.country = newData.country;
    }
    if (newData.city) {
      update.$set.city = newData.city;
    }
    if (newData.description) {
      update.$set.description = newData.description;
    }
    if (newData.user) {
      update.$set.user = new mongoose.Types.ObjectId(newData.user);
    }
    const updated = await Enterprise.findOneAndUpdate({ _id: enterpriseID }, update, {
      new: true,
    });
    res.status(201).json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteEnterprise= async (req, res) => {
  try {
    const enterpriseID = req.params.id;

    try {
      const updated = await Enterprise.findOneAndUpdate({ _id: enterpriseID }, { deleted: true }, { new: true });

      if (!updated) {
        return res.status(404).json({ message: 'Enterprise not was deleted' });
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
