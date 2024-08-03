import { config } from "dotenv";
config({ path: './Config/.env' });
import cors from 'cors';
import express from 'express';
import mongoose from "mongoose";
import morgan from "morgan";
import bodyParser from "body-parser";
import PaymentRoutes from "../Routes/PaymentRoutes.js";
import UserRoutes from "../Routes/UserRoutes.js";
import EnterpriseRoutes from "../Routes/EnterpriseRoutes.js";
import Auth from "../Routes/Auth.js";
import SavedRequest from "../Routes/SavedRequest.js";
import SendEmailRoutes from "../Routes/SendEmailRoutes.js";
import ContactRoutes from "../Routes/ContactRoutes.js";

const app = express();

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
  methods: "GET,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"]
};

//conexión a la base de datos
try {
  mongoose.connect(process.env.DATABASE_URL);
} catch (error) {
  console.log(error);
}


//ajustes
app.set('port',process.env.PORT || 3001);


//middlewares
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use("/payment", PaymentRoutes);
app.use("/users", UserRoutes)
app.use("/auth", Auth)
app.use("/enterprises", EnterpriseRoutes)
app.use("/savedRequest", SavedRequest)
app.use("/passRecovery" , SendEmailRoutes)
app.use("/contact", ContactRoutes);
app.use("/images", express.static("images"))


app.listen(app.get('port'), '0.0.0.0', () => {
  console.log('server on port', app.get('port'));
})
