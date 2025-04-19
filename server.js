const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for cross-origin requests
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static("public"));

// In-memory storage for answers
let answers = [];

// Endpoint to save the user's choice
app.post("/send-email", (req, res) => {
  const { choice } = req.body;

  // Simulate an error response
  const simulateError = true;

  if (simulateError) {
    return res.status(500).send("حدث خطأ أثناء إرسال الرد 💔");
  }

  try {
    if (!choice) {
      return res.status(400).send("الاختيار مطلوب!");
    }
    answers.push(choice);
    console.log(`تم حفظ الإجابة: ${choice}`);
    res.status(200).send("تم إرسال الرد بنجاح!");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("حدث خطأ غير متوقع 💔");
  }
});

// Endpoint to display stored answers
app.get("/hidden", (req, res) => {
  let html = `
    <h2>الإجابات المخزنة:</h2>
    <ul>
      ${answers.map((ans) => `<li>${ans}</li>`).join("")}
    </ul>
  `;
  res.send(html);
});

// Start the server
app.listen(port, () => {
  console.log(`الخادم يعمل على http://localhost:${port}`);
});
