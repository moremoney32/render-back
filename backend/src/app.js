const express = require("express");
const axios = require('axios');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const transporter = require('./helpers/nodermail');

app.use(cors());
app.use(bodyParser.json());

app.post('/pay', async (req, res) => {
  try {
    // Récupérez les données de paiement du frontend
    const paymentData = req.body;
    console.log(paymentData);

    const data = {
      apikey: "15731552066563fcb1669c17.83586925",
      site_id: "5866115",
      transaction_id: Math.floor(Math.random() * 100000000).toString(),
      amount: paymentData.amount,
      currency: "XAF",
      alternative_currency: "",
      description: " TEST INTEGRATION ",
      customer_id: "172",
      customer_name: paymentData.username,
      customer_surname: paymentData.lastname,
      customer_email: paymentData.email,
      customer_phone_number: paymentData.phoneNumber,
      customer_address: paymentData.ville,
      customer_city: paymentData.ville,
      customer_country: "CM",
      customer_state: "CM",
      customer_zip_code: "065100",
      notify_url: "https://webhook.site/d1dbbb89-52c7-49af-a689-b3c412df820d",
      return_url: "https://webhook.site/d1dbbb89-52c7-49af-a689-b3c412df820d",
      channels: "ALL",
      metadata: "user1",
      lang: "FR",
      invoice_data: {
        Donnee1: "",
        Donnee2: "",
        Donnee3: ""
      }
    };
    const mailOptions = {
      from: 'tflkmc1990@gmail.com',
      to: req.body.email,
      subject: 'Code de confirmation',
      text: `Votre code de confirmation est : telecharger votre facture cinetpay`,
    };

    // Effectuez une requête vers CinetPay avec Axios
    const response = await axios.post('https://api-checkout.cinetpay.com/v2/payment', data);
    console.log(response.data);

    // Renvoyez la réponse de CinetPay au frontend
    if(response.data){
      // res.json(response.data);
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'e-mail de confirmation' });
        } else {
          res.status(200).json({ message: 'Utilisateur créé avec succès. Vérifiez votre e-mail pour le code de confirmation.'});
        }
      });
      res.json(response.data);
    }
    
  } catch (error) {
    console.error('Erreur lors du paiement :', error);
    res.status(500).json({ error: 'probleme de connexion' });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Notre app démarre sur le port : http://localhost:${port}`));
