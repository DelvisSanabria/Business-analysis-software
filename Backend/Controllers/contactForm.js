import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "wuausuppcontactus@gmail.com",
    pass: process.env.MAIL_PASS
  }
});


export const ContactUs = async (req, res) => {
  try {
    const { name,lastName, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Please fill in all required fields" });
    }

    const mail = {
      from: email,
      to: "wuausuppcontactus@gmail.com",
      subject: "Contact Form Submission",
      text: `Name: ${name}\nLast Name: ${lastName}\nEmail: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mail, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred while sending the message" });
      } else {
        console.log('Email sent:', info.response);
        return res.status(200).json({ message: "Your message has been sent successfully!" });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
