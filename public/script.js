document.addEventListener("DOMContentLoaded", () => {
  const acceptBtn = document.getElementById("acceptBtn");
  const declineBtn = document.getElementById("declineBtn");
  const options = document.getElementById("options");
  const responseMsg = document.getElementById("responseMsg");
  const choices = document.querySelectorAll(".choice");
  const initialBtnDiv = document.getElementById("initialBtnDiv");
  const invitationMessage = document.getElementById("invitationMessage");

  // عند الضغط على "أوافق"
  acceptBtn.addEventListener("click", () => {
    // إخفاء النص الأساسي
    invitationMessage.classList.add("hidden");
    // إخفاء أزرار البداية
    initialBtnDiv.classList.add("hidden");
    // إظهار الخيارات
    options.classList.remove("hidden");
  });

  // عند الضغط على "لا أوافق"
  declineBtn.addEventListener("click", () => {
    // إخفاء النص الأساسي
    invitationMessage.classList.add("hidden");
    // إخفاء أزرار البداية
    initialBtnDiv.classList.add("hidden");
    // إظهار الخيارات
    options.classList.remove("hidden");
    responseMsg.textContent = "لا بأس، يمكنك الراحة. 😔";
  });

  // عند اختيار أحد الخيارات
  choices.forEach((btn) => {
    btn.addEventListener("click", async () => {
      try {
        const response = await fetch("/response", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ choice: btn.textContent }),
        });

        const result = await response.json();
        responseMsg.textContent = result.message;
        options.classList.add("hidden");
      } catch (error) {
        responseMsg.textContent = "حدث خطأ أثناء إرسال الرد 💔";
      }
    });
  });
});
