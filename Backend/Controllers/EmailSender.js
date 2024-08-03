import { config } from "dotenv";
config({ path: './Config/.env' });
import nodemailer from "nodemailer";
import { Router } from "express";
import { randomNumber, keys, newKeys, timeout } from "../handdlers/recoverypass.js";


const emailRouter = Router();


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "wuausuppcontactus@gmail.com",
    pass: process.env.MAIL_PASS
  }
});

export const sendRecoveryCode = async (req, res) => {
  const { email } = req.body;
  const mail = {
    from: "wuausuppcontactus@gmail.com",
    to: email,
    subject: "Recovery Password",
    text: `Use this code to reset your password: ${keys[email]}`,
  };

  transporter.sendMail(mail, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send("An error has occurred: " + error);
    } else {
      if (timeout[email]) {
        clearTimeout(timeout[email]);
      }
      timeout[email] = setTimeout(() => {
        keys[email] = randomNumber();
      }, 60000 * 5);
      res.status(200).send("Email sent: " + info.response);
    }
  });
}

export const keyValidation = async (req, res) => {
  const { userKey, email } = req.body
  if (userKey === keys[email]) {
    clearTimeout(timeout[email]);
    delete timeout[email];
    delete keys[email];
    delete newKeys[email];
    return res.status(200).send("Successful validation proceed to change your password")
  } else {
    return res.status(400).json({userKey: "An error occurred while validating the code tries again to generate another code"})
  }
}

export default {emailRouter };