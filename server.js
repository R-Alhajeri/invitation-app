const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000; // Use environment variable for the port

// Enable CORS for cross-origin requests
app.use(cors());

// لتتمكن من استخدام البيانات التي تُرسل على شكل JSON
app.use(express.json());

// تخزين الإجابات في الذاكرة
let answers = [];

// نقطة النهاية لاستلام الإجابة
app.post("/send-email", async (req, res) => {
  const { choice } = req.body;
  try {
    if (!choice) {
      return res.status(400).send("الاختيار مطلوب!");
    }
    // حفظ الإجابة في الذاكرة
    answers.push(choice);
    console.log(`تم حفظ الإجابة: ${choice}`);
    res.status(200).send("تم إرسال الرد بنجاح!");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("حدث خطأ أثناء إرسال الرد 💔");
  }
});

// نقطة النهاية لعرض الإجابات المخزنة
app.get("/answers", (req, res) => {
  res.json(answers); // إرجاع جميع الإجابات المخزنة
});

// نقطة النهاية لصفحة مخفية (hidden)
app.get("/hidden", (req, res) => {
  res.send(`
    <h1>الصفحة المخفية</h1>
    <p>هذه الصفحة تعرض الإجابات المخزنة في الذاكرة:</p>
    <pre>${JSON.stringify(answers, null, 2)}</pre>
  `);
});

// تشغيل الخادم
app.listen(port, () => {
  console.log(`الخادم يعمل على http://localhost:${port}`);
});
