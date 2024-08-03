import { config } from "dotenv";
config({ path: '../Config/.env' });
import mongoose from "mongoose";
import { User } from "../Models/user.js";;
import bcrypt from "bcrypt";
import moment from "moment";


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
  const ObjectId = mongoose.Types.ObjectId;
  try {
    const term = req.params.term;

    let filteredUsers;
    if (ObjectId.isValid(term)) {
      filteredUsers = await User.find({ _id: new ObjectId(term) });
    } else {
      const regex = new RegExp(term, 'i');
      filteredUsers = await User.find({
        $or: [
          { name: { $regex: regex } },
          { lastName: { $regex: regex } },
          { email: { $regex: regex } },
        ],
      });
    }

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error(error);
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
    const { password, ...userData } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const convertedData = {
      ...userData,
      password: hash,
      enterprises: userData.enterprises?.map((id) =>
        new mongoose.Types.ObjectId(id)
      ),
      payments: userData.payments?.map((id) => new mongoose.Types.ObjectId(id)),
      savedRequests: userData.savedRequests?.map((id) =>
        new mongoose.Types.ObjectId(id)
      ),
    };
    const user = new User(convertedData);
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
    if (newData.plan) {
      update.$set.plan = newData.plan;
    }
    if (newData.role) {
      update.$set.role = newData.role;
    }
    if (newData.enterprises) {
      update.$push.enterprises = { $each: newData.enterprises.map(id => new mongoose.Types.ObjectId(id)) };
    }
    if (newData.payments) {
      update.$push.payments = { $each: newData.payments.map(id => new mongoose.Types.ObjectId(id)) };
    }
    if (newData.savedRequests) {
      update.$push.savedRequests = { $each: newData.savedRequests.map(id => new mongoose.Types.ObjectId(id)) };
    }

    update.$set.updatedAt = moment().format();

    if (!Object.keys(update.$set).length) delete update.$set;
    if (!Object.keys(update.$set).length) delete update.$set;

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
