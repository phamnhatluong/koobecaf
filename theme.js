// Theme toggle logic
const toggleThemeBtn = document.getElementById("toggleThemeBtn");
const body = document.body;

// Apply saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  body.classList.add("light-mode");
}

function updateThemeBtn() {
  if (body.classList.contains("light-mode")) {
    toggleThemeBtn.innerText = "🌞 Chế độ sáng";
  } else {
    toggleThemeBtn.innerText = "🌙 Chế độ tối";
  }
}

updateThemeBtn();

toggleThemeBtn.onclick = () => {
  body.classList.toggle("light-mode");
  const isLight = body.classList.contains("light-mode");
  localStorage.setItem("theme", isLight ? "light" : "dark");
  updateThemeBtn();
};

// Listen for theme changes from other tabs
window.addEventListener("storage", (e) => {
  if (e.key === "theme") {
    const newTheme = e.newValue;
    if (newTheme === "light") {
      body.classList.add("light-mode");
    } else {
      body.classList.remove("light-mode");
    }
    updateThemeBtn();
  }

  // Listen for username changes from other tabs
  if (e.key === "currentUser") {
    const updatedUser = JSON.parse(e.newValue || "{}");
    const welcomeText = document.getElementById("welcomeText");
    const welcomeAccount = document.getElementById("welcomeaccount");

    if (updatedUser.username) {
      if (welcomeText) welcomeText.innerText = updatedUser.username;
      if (welcomeAccount) welcomeAccount.innerText = updatedUser.username;
    }
  }
});
