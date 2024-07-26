require('dotenv').config({ path: './config/.env' });
const express = require("express"); 
const app = express();
const mongoose = require("mongoose"); 
const cors = require("cors");
/* const userRouter = require("./Routes/Users");
const PaymentRouter = require("./Routes/Payment");
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
app.use(express.json());
/* 
app.use(express.json());
app.use("/images", express.static("images"));
app.use("/users", userRouter);
app.use("/payment", PaymentRouter);
app.use("/SavedRequest", SavedRequest);
app.use("/mailsender", mailRouter); */


//puerto
app.listen(app.get('port'), '0.0.0.0', () => {
  console.log('server on port', app.get('port'));
})
