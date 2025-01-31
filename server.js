const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configure Gmail SMTP
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, // Use 465 for SSL
    secure: true,
    auth: {
        user: "newtron.eng@gmail.com",  // Replace with your Gmail
        pass: "njzpgrkbdwhfymrz"      // Replace with your Gmail App Password
    }
});

// API Endpoint to Send Email
app.post("/send-email", async (req, res) => {
    const { to, subject, body } = req.body;

    try {
        let info = await transporter.sendMail({
            from: 'newtron.eng@gmail.com',
            to: to,
            subject: subject,
            text: body
        });

        res.json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
        console.error("Full Email Error:", error);  // Logs the full error details in the terminal
        
        // Send full error message to the frontend
        res.status(500).json({ 
            success: false, 
            message: `Email sending failed: ${error.message}`, // Show the actual error
            error: error // Send the full error object (for debugging)
        });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
