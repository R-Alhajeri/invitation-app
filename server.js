app.post("/send-email", (req, res) => {
  const { choice } = req.body;

  // Simulate an error response (toggle via query parameter or environment variable)
  const simulateError = process.env.SIMULATE_ERROR === "true";

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
