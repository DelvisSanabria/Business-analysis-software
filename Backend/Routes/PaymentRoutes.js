import { Router } from "express";

import {
  createOrder,
  captureOrder,
  cancelPayment,
  searchPayment,
  updatePayment,
  deletePayment,

} from "../Controllers/Payment.js";

const router = Router();

router.get("/create-order", createOrder);

router.get("/capture-order", captureOrder);

router.get("/cancel-order", cancelPayment);

router.get("/updatePayment", updatePayment);

router.get("/searchPayment/:id", searchPayment);

router.get("/deletePayment/:id", deletePayment);

export default router;