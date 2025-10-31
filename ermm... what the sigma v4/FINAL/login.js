const inputEmail = document.querySelector(".input-login-email");
const inputPassword = document.querySelector(".input-login-password");
const btnLogin = document.querySelector(".login-form-button-main");
const btnToRegister = document.querySelector(".login-form-button-register");

btnToRegister.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = 'Signup_screen.html';
});

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();

  if (inputEmail.value === "" || inputPassword.value === "") {
    alert("Vui lòng không để trống email hoặc mật khẩu.");
    return;
  }

  try {
    const user = JSON.parse(localStorage.getItem(inputEmail.value));

    if (user && user.email === inputEmail.value && user.password === inputPassword.value) {
      alert("Đăng Nhập Thành Công!");
      window.location.href = "main_interface_1.html";
    } else {
      alert("Đăng Nhập Thất Bại. Vui lòng kiểm tra lại email và mật khẩu.");
    }
  } catch (error) {
    alert("Đăng Nhập Thất Bại. Tài khoản không tồn tại.");
  }
});