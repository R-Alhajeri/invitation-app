const express = require("express");
const app = express();
const port = 3000;

// لتتمكن من استخدام البيانات التي تُرسل على شكل JSON
app.use(express.json());

// تخزين الإجابات في الذاكرة
let answers = [];

// نقطة النهاية لاستلام الإجابة
app.post("/send-email", async (req, res) => {
  const { choice } = req.body;
  try {
    // حفظ الإجابة في الذاكرة
    answers.push(choice);
    console.log(`تم حفظ الإجابة: ${choice}`);
    res.status(200).send("تم إرسال الرد بنجاح!");
  } catch (error) {
    console.error(error);
    res.status(500).send("حدث خطأ أثناء إرسال الرد 💔");
  }
});

// تشغيل الخادم
app.listen(port, () => {
  console.log(`الخادم يعمل على http://localhost:${port}`);
});
