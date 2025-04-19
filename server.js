const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let latestResponse = "";

app.post("/response", (req, res) => {
  const { choice } = req.body;
  if (choice) {
    latestResponse = choice;
    console.log("Received response:", choice);
    res.status(200).json({ message: "تم استلام ردك ❤️" });
  } else {
    res.status(400).json({ message: "لم يتم استلام اختيار" });
  }
});

app.get("/latest-response", (req, res) => {
  res.status(200).json({ choice: latestResponse });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
