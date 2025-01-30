// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 5298;

// Middleware
app.use(cors()); // Enable CORS if your frontend is hosted on a different domain
app.use(bodyParser.json());

// Route to handle enquiry form submission
app.post('/api/enquiry', async (req, res) => {
    debugger;
    const { name, email, message } = req.body;
    console.log('Enquiry data: ', req.body);
    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        // Configure Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // Use your email service provider here (e.g., Gmail, Outlook, etc.)
            auth: {
                user: '2203himanshusingh@gmail.com', // Replace with your email address
                pass: ''   // Replace with your email password or app password
            }   
        });

        // Email content
        const mailOptions = {
            from: '2203himanshusingh@gmail.com', // Sender address //smtmp se set hoga
            to: email, // Recipient address from enquiry data//newtrongmal
            subject: 'Thank you for your enquiry',
            text: `Hello ${name},\n\nThank you for reaching out to us! We have received your enquiry and will get back to you shortly.\n\nYour message: \"${message}\"\n\nBest regards,\n[Your Company Name]`,
            html: `<p>Hello <b>${name}</b>,</p><p>Thank you for reaching out to us! We have received your enquiry and will get back to you shortly.</p><p><b>Your message:</b> "${message}"</p><p>Best regards,<br>[Your Company Name]</p>`
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return res.status(200).json({ success: true, message: 'Enquiry submitted and email sent successfully.' });
    } catch (error) {
        debugger;
        console.error('Error sending email:', error);
        return res.status(500).json({ success: false, message: 'Failed to send email.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
