const express = require("express");
const axios = require('axios');
const app = express();
const transporter = require('./helpers/nodermail');
const path = require('path');
const bodyParser = require("body-parser");
const cors = require("cors");


app.use(cors());
app.use(bodyParser.json());
app.use('/icons', express.static(path.join(__dirname, 'icons')));

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
      subject: 'Facture de votre commande',
      html: `
        <html>
          <head>
            <style>
            #bloc-page{
              gap: 20px;
              margin: auto;
              width: 50%;
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background:#f76e11;
              color:white !important;
              padding-left:25px;
              padding-right:25px;
              border-radius: 20px;
              padding-top: 10px;
              padding-bottom: 10px;
            }
           
#object{
  text-align: center;

}

table {
    border-collapse: collapse;  
    width: 50%;
    margin:auto;
  }
  th, td{
    border: 1px solid black;
    padding: 18px;
    text-align: center;
  }
  th{
    font-size: 20px;
  }
  icons{
    width: 50px;
    height:50px;
  }
  .tfl{
    color:white;
    font-size: 40px;
    font-weight: 500;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  
 
  p{
   top: 100px;
    font-size: 25px;
    color: black;
  }
  
  .parent-footer{
    text-align: center;
  }
  @media screen and (max-width:767px) {
     #bloc-page{
              margin:0;
              width:fit-content;
            }

#object{
  text-align:center;
 
}
table {
  border-collapse: collapse;  
  width: 100%;
}
h1{
  font-size: 25px;

}
th, td{
  border: 1px solid black;
  padding: 5px;
  text-align: center;
}
th{
  font-size:20px;
}
.tfl{
  color:white;
  font-size: 15px;
  font-weight: 500;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}


p{
  font-size: 15px;
  color: black;
}
.parent-footer{
  text-align: center;
  width: 70%;
  margin: auto;
}
  }
            </style>
          </head>
          <body>
          <div id="bloc-page">
          <div id="object">
              <h1>
                  ${paymentData.lastname}
              </h1>
              <p>Suite a votre commande au restaurant</p>
              <span class="tfl">CASA-DEL-FRANCOO</span>
              <p>votre facture est la suivante:</p>
          </div>
          <table>   
              <tr>
                  <th>Recettes</th>
                  <th>Quantite</th>
                  <th>Pu</th>
                  <th>PRix Total</th>
              </tr>
              
              <tbody id="menu-recettes">
              ${paymentData.arrayRecette.map(recette => `
              <tr>
                <td>${recette.h2}</td>
                <td>${recette.quantity}</td>
                <td>${recette.price}</td>
              </tr>
            `).join('')}
              
              </tbody>
             
             <tr id="menu-recettes-total">
              <th>TOTAL</th>
              <th>${paymentData.quantity}</th>
              <th></th>
              <th>${paymentData.amount}</th>
              
              </tr>
          </table>
          <div class="parent-footer">
              <p class="footer">Bonne degustation et merci de votre fidelite</p>
          </div>
      </div>
      
          </body>
        </html>
      `,
    };

    // Effectuez une requête vers CinetPay avec Axios
    const response = await axios.post('https://api-checkout.cinetpay.com/v2/payment', data);
    console.log(response.data);

    // Renvoyez la réponse de CinetPay au frontendd
    if(response.data){
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'e-mail de confirmation' });
        } else {
          res.status(200).json({ message: 'Utilisateur créé avec succès. Vérifiez votre e-mail pour le code de confirmation.' });
        }
      });
      res.json(response.data);
    }
    // res.json(response.data);
  } catch (error) {
    console.error('Erreur lors du paiement :', error);
    res.status(500).json({ error: 'probleme de connexion' });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Notre app démarre sur le port : http://localhost:${port}`));
