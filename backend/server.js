const express = require("express");
const cors = require("cors")
const dbConnection = require("./config/db");
const authRoutes = require("./routes/authRoute");
const admin = require("./routes/adminRoute");
const visitors = require("./routes/visitorRoute");
const appointments = require("./routes/appointmentRoute");
const passes = require("./routes/passRoute");
const checklogs = require("./routes/checklogsRoute");
const dashboard = require("./routes/dashboardRoute");

require('dotenv').config();

dbConnection();

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("welcome...");
});

app.use("/register", authRoutes);
app.use("/users", admin);
app.use("/visitors", visitors);
app.use("/appointments", appointments);
app.use("/pass", passes);
app.use("/checklogs", checklogs);
app.use("/dashboard", dashboard);


const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
