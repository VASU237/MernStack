require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./router/auth-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middlewares");
const contactRoute = require("./router/contact-router");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET ,POST,DELETE,PATCH,PUT,HEAD",
  Credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", router);
app.use("/api/form", contactRoute);

app.use(errorMiddleware);

const PORT = 3000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log("chal raha hai 3000");
  });
});
