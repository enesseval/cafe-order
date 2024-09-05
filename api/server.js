const express = require("express");
const cors = require("cors");
const Iyzipay = require("iyzipay");
require("dotenv").config();

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

const iyzipay = new Iyzipay({
   apiKey: process.env.IYZICO_API_KEY,
   secretKey: process.env.IYZICO_SECRET_KEY,
   uri: "https://sandbox-api.iyzipay.com",
});

app.get("/api/payment", (req, res) => {
   res.json({ message: "Hello payment" });
});

app.post("/api/payment", (req, res) => {
   var request = {
      locale: Iyzipay.LOCALE.TR,
      conversationId: "123456789",
      price: req.body.price,
      paidPrice: req.body.price,
      currency: Iyzipay.CURRENCY.TRY,
      installment: "1",
      basketId: req.body.basketId,
      paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
      paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
      paymentCard: req.body.paymentCard,
      buyer: {
         id: "BY789",
         name: "John",
         surname: "Doe",
         gsmNumber: "+905350000000",
         email: "email@email.com",
         identityNumber: "74300864791",
         lastLoginDate: "2015-10-05 12:43:35",
         registrationDate: "2013-04-21 15:12:09",
         registrationAddress: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
         ip: "85.34.78.112",
         city: "Istanbul",
         country: "Turkey",
         zipCode: "34732",
      },
      shippingAddress: {
         contactName: "Jane Doe",
         city: "Istanbul",
         country: "Turkey",
         address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
         zipCode: "34742",
      },
      billingAddress: {
         contactName: "Jane Doe",
         city: "Istanbul",
         country: "Turkey",
         address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
         zipCode: "34742",
      },
      basketItems: req.body.basketItems,
   };

   iyzipay.payment.create(request, function (err, result) {
      if (err) console.log(err);
      return res.json({ result });
   });
});

const port = process.env.port || 3001;

app.listen(port, () => {
   console.log(`Server is running on ${port}`);
});
