const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public")); // لو عندك ملفات frontend

// تخزين الإجابات في الذاكرة
let answers = [];
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// لحفظ الإجابة
app.post("/send-email", async (req, res) => {
  const { choice } = req.body;
  try {
    answers.push(choice);
    console.log(`تم حفظ الإجابة: ${choice}`);
    res.status(200).send("تم إرسال الرد بنجاح!");
  } catch (error) {
    console.error(error);
    res.status(500).send("حدث خطأ أثناء إرسال الرد 💔");
  }
});

// صفحة مخفية تعرض الإجابات
app.get("/hidden", (req, res) => {
  let html = `
    <h2>الإجابات المخزنة:</h2>
    <ul>
      ${answers.map((ans) => `<li>${ans}</li>`).join("")}
    </ul>
  `;
  res.send(html);
});

// تشغيل الخادم
app.listen(port, () => {
  console.log(`الخادم يعمل على http://localhost:${port}`);
});
