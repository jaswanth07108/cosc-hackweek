const express = require("express");
const cors = require("cors");
const uploadRoute = require("./routes/upload");
const chatRoute = require("./routes/chat");
require("dotenv").config();
console.log("API Key:", process.env.GROQ_API_KEY);


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend is running 🚀"
  });
});
app.use("/upload", uploadRoute);
app.use("/chat", chatRoute);

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});