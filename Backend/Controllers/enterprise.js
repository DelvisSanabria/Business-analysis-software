import { config } from "dotenv";
config({ path: '../Config/.env' });
import mongoose from "mongoose";
import { Enterprise } from "../Models/enterprise.js";;
import bcrypt from "bcryptjs";
import fs from "fs";


const domain = process.env.DOMAIN || "http://localhost:3001";

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

export const uploadImage = async (req, res) => {
  try {
    let enterprise = await Enterprise.findById(req.body.id);
    if (!enterprise) {
      return res.status(404).json({ enterprise: "Company Not Found Unable to Update Image" });
    }
    if (req.file) {
      enterprise.avatar = `${domain}/images/enterprises/${req.file.filename}`;
      await enterprise.save();
    }
    return res.status(200).json(enterprise);
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
    return res.status(500).json({ name: error.name, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        return res.status(200).json(user);
      } else {
        return res.status(406).json({ password: "La contraseña es incorrecta" });
      }
    } else {
      return res.status(404).json({ email: "Correo no registrado" });
    }
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
    return res.status(500).json({ name: error.name, message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const usEmail = req.params.email;
    const newData = req.body;
    const user = await User.findOne({ email: usEmail });
    if (!user) {
      return res
        .status(404)
        .json({ message: "No se encontró un usuario con ese correo" });
    }
    const imagePath = req.file ? req.file.path : undefined;

    let update = { $set: {} };

    if (imagePath) {
      update.$set.avatar = `${domain}/${imagePath}`;
      const startIndex = user.avatar.indexOf("images");
      const avatarFilePathPrev = user.avatar.substring(startIndex);
      const filePath = avatarFilePathPrev
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log("Archivo eliminado:", filePath);
      } else {
        console.log("El archivo no existe:", filePath);
      }
    }
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
        return res.status(406).json({ password: "La nueva contraseña debe ser diferente de la última" });
      }
    }
    if (newData.lastName) {
      update.$set.lastName = newData.lastName;
    }
    if (newData.phone) {
      update.$set.phone = newData.phone;
    }
    if (newData.address) {
      update.$set.address = newData.address;
    }
    if (newData.role) {
      update.$set.role = newData.role;
    }
    const updated = await User.findOneAndUpdate({ email: usEmail }, update, {
      new: true,
    });
    res.status(201).json(updated);
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

      res.json(updated);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
