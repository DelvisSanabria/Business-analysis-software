import { config } from "dotenv";
config({ path: '../Config/.env' });
import mongoose from "mongoose";
import { User } from "../Models/user.js";;
import bcrypt from "bcryptjs";


const ObjectId = mongoose.Types.ObjectId;

export const ObtainAllUsers = async (req, res) => {
  try {
    const { page, limit, role } = req.query;
    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 6,
      sort: { createdAt: -1 },
      customLabels: { docs: "users", totalDocs: "count" }
    };
    let query = { deleted: false };
    if (role === "client") {
      query = { ...query, role: "client" };
    }
    let users = await User.paginate(query, options);

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const searchUser = async (req, res) => {
  try {
    const userData = req.query.term;
    let filteredUser = [];
    if (ObjectId.isValid(userData)) {
      filteredUser = await User.find({ _id: new ObjectId(userData) });
    } else {
      filteredUser = await User.find({
        $or: [
          { name: userData.toLocaleLowerCase() },
          { lastName: userData.toLocaleLowerCase() },
          { email: userData.toLocaleLowerCase() },
        ]
      });
    }
    res.status(201).json(filteredUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const obtainUserByEmail = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.params.email });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


export const createUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(req.body.password, salt);
    let user = new User({ ...req.body, password: hash });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const usEmail = req.params.email;
    const newData = req.body;
    const user = await User.findOne({ email: usEmail });
    if (!user) {
      return res.status(404).json({ message: "A user was not found with that email" });
    }

    let update = { $set: {}, $push: {} };

    if (newData.name) {
      update.$set.name = newData.name;
    }
    if (newData.email) {
      update.$set.email = newData.email;
    }
    if (newData.password) {
      const match = await bcrypt.compare(newData.password, user.password);
      if (!match) {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(newData.password, salt);
        update.$set.password = hash;
      } else {
        return res.status(406).json({ password: "The new password must be different from the last one you entered" });
      }
    }
    if (newData.lastName) {
      update.$set.lastName = newData.lastName;
    }
    if (newData.accessToken) {
      update.$set.accessToken = newData.accessToken;
    }
    if (newData.plan) {
      update.$set.plan = newData.plan;
    }
    if (newData.role) {
      update.$set.role = newData.role;
    }
    if (newData.enterprises) {
      update.$push.enterprises = { $each: newData.enterprises.map(id => mongoose.Types.ObjectId(id)) };
    }
    if (newData.payments) {
      update.$push.payments = { $each: newData.payments.map(id => mongoose.Types.ObjectId(id)) };
    }
    if (newData.savedRequests) {
      update.$push.savedRequests = { $each: newData.savedRequests.map(id => mongoose.Types.ObjectId(id)) };
    }

    update.$set.updatedAt = moment().format();

    if (!Object.keys(update.$set).length) delete update.$set;
    if (!Object.keys(update.$addToSet).length) delete update.$addToSet;

    const updated = await User.findOneAndUpdate({ email: usEmail }, update, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


export const deleteUser= async (req, res) => {
  try {
    const userEmail = req.params.email;

    try {
      const updated = await User.findOneAndUpdate({ email: userEmail }, { deleted: true }, { new: true });

      if (!updated) {
        return res.status(404).json({ message: 'User not was updated' });
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
