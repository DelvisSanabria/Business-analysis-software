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

router.post("/create-order", createOrder);

router.post("/capture-order", captureOrder);

router.get("/cancel-order", cancelPayment);

router.patch("/updatePayment", updatePayment);

router.get("/searchPayment/:id", searchPayment);

router.patch("/deletePayment/:id", deletePayment);

export default router;