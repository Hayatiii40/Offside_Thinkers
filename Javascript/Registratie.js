document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("Formulier");

  if (!form) {
    console.error("❌ Formulier niet gevonden!");
    return;
  }

  form.addEventListener("submit", function (e) {
    
    console.log("✅ Formulier wordt verzonden!");

    const username = document.getElementById("username")?.value;
    const password = document.getElementById("password")?.value;
    const confirmPassword = document.getElementById("confirm-password")?.value;

  });
});
