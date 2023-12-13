const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'tflkmc1990@gmail.com',
    pass: 'g p b p a l i f i j j k c g r o',
  },
});
module.exports = transporter;