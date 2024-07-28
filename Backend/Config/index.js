import { config } from "dotenv";
config({ path: './Config/.env' });
import cors from 'cors';
import express from 'express';
import mongoose from "mongoose";
import morgan from "morgan";
import bodyParser from "body-parser";
import PaymentRoutes from "../Routes/PaymentRoutes.js";

const app = express();
/* const userRouter = require("./Routes/Users");

const mailRouter = require("./Controllers/EmailSender");
const SavedRequest = require("./Routes/SavedRequest");
*/
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
/* 

app.use("/images", express.static("images"));
app.use("/users", userRouter);

app.use("/SavedRequest", SavedRequest);
app.use("/mailsender", mailRouter); */



app.listen(app.get('port'), '0.0.0.0', () => {
  console.log('server on port', app.get('port'));
})
