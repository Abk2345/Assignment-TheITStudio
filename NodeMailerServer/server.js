const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
  const { name, phoneNumber, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'abhishantk74@gmail.com',
        //created app password by using 2 factor authentication in gmail for secure app SMTP protocol
        pass: 'peyfmyabmixbkqhr',
      },
    });

    const mailOptions = {
      from: 'abhishantk74@gmail.com',
      // to: 'abhishant11@gmail.com',
      to: 'info@redpositive.in',
      subject: 'Internship Assignment: Message using node mailer',
      html: `
            <p>Name: ${name}</p>
             <p>Phone: ${phoneNumber}</p>
            <p>Email: ${email}</p>
            <p>Message: ${message}</p>
          `,
    };

    await transporter.sendMail(mailOptions);

    res.sendStatus(200); // Email sent successfully
  } catch (error) {
    console.error('Error sending email:', error);
    res.sendStatus(500); // Server error
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
})
