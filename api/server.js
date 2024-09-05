const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/api/payment", (req, res) => {
   res.json({ message: "Hello payment" });
});

const port = process.env.port || 3001;

app.listen(port, () => {
   console.log(`Server is running on ${port}`);
});
