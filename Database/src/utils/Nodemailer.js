const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'AbdilaahiMowliid@gmail.com',
      pass: 'kzhl gyxf szwx hkne ',
    },
  });
  
  // Define a route to handle email sending
  app.post('/send-email', (req, res) => {
    const { name, email, phone, company, message } = req.body;
  
    const mailOptions = {
      from: 'Abdilaahimowliid@gmail.com',
      to: 'recipient-email@example.com', // Replace with the recipient email address
      subject: 'New Contact Form Submission',
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send(error.toString());
      }
      res.status(200).send('Email sent: ' + info.response);
    });
  });