const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser"); // Import body-parser

const authRoutes = require("./auth-controller");

const app = express();
app.use(express.json()); // Ensure JSON requests are parsed correctly
app.use(bodyParser.json()); // Explicitly enable body-parser
app.use(cors());

app.use("/api", authRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});