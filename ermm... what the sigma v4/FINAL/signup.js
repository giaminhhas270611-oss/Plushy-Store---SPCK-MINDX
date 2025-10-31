const inputEmail = document.querySelector(".input-regis-email");
const inputPassword = document.querySelector(".input-regis-password");
const btnRegis = document.querySelector(".regis-form-button-main");
const btnToLogin = document.querySelector(".regis-form-button-login");

btnToLogin.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = 'Login_screen.html';
});

btnRegis.addEventListener("click", (e) => {
  e.preventDefault();

  if (inputEmail.value === "" || inputPassword.value === "") {
    alert("Vui lòng không để trống ô nào.");
    return;
  }

  if (localStorage.getItem(inputEmail.value)) {
    localStorage.removeItem(inputEmail.value);
    alert("Tài khoản cũ với email này đã bị ghi đè.");
  }

  const user = {
    email: inputEmail.value,
    password: inputPassword.value,
  };

  const json = JSON.stringify(user);
  localStorage.setItem(inputEmail.value, json);

  alert("Đăng Ký Thành Công!");
  window.location.href = "Login_screen.html";
});