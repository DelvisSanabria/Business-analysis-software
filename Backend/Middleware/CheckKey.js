import { randomNumber,keys, newKeys } from "../Handdlers/recoverypass.js";

export const checkKeys = (req, _, next) => {
  const { email } = req.body;
  if (!keys[email]) {
    keys[email] = randomNumber();
    newKeys[email] = keys[email]
  } else if (newKeys[email] === keys[email]) {
    keys[email] = randomNumber();
    newKeys[email] = keys[email]
  }
  next();
}