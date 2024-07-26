require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const productRouter = require("./routes/products")

const cors = require('cors');
//express app
const app = express();

//middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Enable CORS for all routes
app.use(cors());

//routes
app.use("/api/product", productRouter);

//connect to db
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    //listen fo requests
    app.listen(process.env.PORT, () => {
      console.log(`Connected to bd & server is listening on Port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

