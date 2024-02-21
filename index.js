
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// CREATE the middleware for parsing requested bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// define to the server that the static files are stored inside the public folder
app.use(express.static('public'));

// define the route for the home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/send-email.html');
});

// configure nodemailer
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rakesh7091mandal@gmail.com',
        pass: 'sqcc reph zexc rmjg'
    }
});

// create the route for the form
app.post('/send-email', (req, res) => {
    const { to, subject, message } = req.body;

    const mailOptions = {
        from: 'rakesh7091mandal@gmail.com', // Sender email address
        to,
        subject,
        text: message // Assuming 'message' is the actual text content
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error in sending mail');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully');
        }
    });
});

// start the server with a specific port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});