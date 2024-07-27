import axios from "axios";
import { config } from "dotenv";
config({ path: '../Config/.env' });


export const createOrder = async (req, res) => {
  try {
    const order = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: "15.00",
          },
        },
      ],
      application_context: {
        brand_name: "Wuau_Marketing",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url: `http://localhost:${process.env.PORT}/payment/capture-order`,
        cancel_url: `http://localhost:${process.env.PORT}/payment/cancel-payment`,
      },
    };

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");


    const {
      data: { access_token },
    } = await axios.post(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: process.env.PAYPAL_CLIENT_KEY,
          password: process.env.PAYPAL_SECRET_KEY,
        },
      }
    );

    console.log(access_token);


    const response = await axios.post(
      `${process.env.PAYPAL_DEV_URL}/v2/checkout/orders`,
      order,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    console.log(response.data);

    return res.redirect(response.data.links[1].href);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something goes wrong with u request");
  }
};

export const captureOrder = async (req, res) => {
  const { token } = req.query;

  try {
    const response = await axios.post(
      `${process.env.PAYPAL_DEV_URL}/v2/checkout/orders/${token}/capture`,
      {},
      {
        auth: {
          username: process.env.PAYPAL_CLIENT_KEY,
          password: process.env.PAYPAL_SECRET_KEY,
        },
      }
    );

    console.log(response.data);

    res.redirect( `http://localhost:${process.env.PORT}/`);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

export const cancelPayment = (req, res) => res.redirect("/");