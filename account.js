import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB1hj75YSToaR_RliGxoPAFyGXZVpFqTm4",
  authDomain: "we-are-always-here.firebaseapp.com",
  projectId: "we-are-always-here",
  storageBucket: "we-are-always-here.firebasestorage.app",
  messagingSenderId: "976166105043",
  appId: "1:976166105043:web:1ea3a17025c4df62148926",
  measurementId: "G-R8VN95690J"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser || !currentUser.email) {
  window.location.href = "login.html";
}

const userAvatar = document.getElementById("userAvatar");
const accountAvatar = document.querySelector(".account-avatar");
const avatarInput = document.getElementById("avatarInput");
const welcomeText = document.getElementById("welcomeText");
const welcomeAccount = document.getElementById("welcomeaccount");

const backgroundImg = document.querySelector(".background-img");
const backgroundInput = document.getElementById("backgroundInput");
const selectImgBtn = document.querySelector(".select-img");

if (welcomeText) {
  welcomeText.innerText = `Xin chào, ${currentUser.email}`;
}
if (welcomeAccount) {
  welcomeAccount.innerText = currentUser.email;
}

if (currentUser.avatar) {
  if (userAvatar) userAvatar.src = currentUser.avatar;
  if (accountAvatar) accountAvatar.src = currentUser.avatar;
}
if (currentUser.background && backgroundImg) {
  backgroundImg.src = currentUser.background;
}

window.logout = function () {
  localStorage.removeItem("currentUser");
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
};

if (userAvatar) {
  userAvatar.addEventListener("click", () => {
    window.location.href = "account.html";
  });
}

if (accountAvatar && avatarInput) {
  accountAvatar.addEventListener("click", () => {
    const accept = confirm("Bạn có muốn đổi ảnh đại diện không?");
    if (accept) {
      avatarInput.click();
    }
  });

  avatarInput.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "nguyendueducation");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/djaw7n4af/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      const imageUrl = data.secure_url;

      if (userAvatar) userAvatar.src = imageUrl;
      if (accountAvatar) accountAvatar.src = imageUrl;

      currentUser.avatar = imageUrl;
      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      alert("Ảnh đại diện đã được cập nhật!");
    } catch (error) {
      console.error("Upload avatar thất bại:", error);
      alert("Không thể cập nhật ảnh đại diện. Vui lòng thử lại.");
    }
  });
}

selectImgBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const accept = confirm("Bạn có muốn thay đổi hình nền không?");
  if (accept && backgroundInput) {
    backgroundInput.click();
  }
});

backgroundImg.addEventListener("click", () => {
  const accept = confirm("Bạn muốn đổi ảnh nền?");
  if (accept && backgroundInput) {
    backgroundInput.click();
  }
});

backgroundInput.addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "nguyendueducation");

  try {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/djaw7n4af/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    const imageUrl = data.secure_url;

    if (backgroundImg) backgroundImg.src = imageUrl;

    currentUser.background = imageUrl;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    alert("Ảnh nền đã được cập nhật!");
  } catch (error) {
    console.error("Upload background thất bại:", error);
    alert("Không thể cập nhật ảnh nền. Vui lòng thử lại.");
  }
});
