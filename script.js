(function () {
  "use strict";

  const form = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const togglePasswordBtn = document.getElementById("togglePassword");
  const submitBtn = document.getElementById("submitBtn");
  const btnText = submitBtn.querySelector(".btn-text");
  const btnSpinner = submitBtn.querySelector(".btn-spinner");

  /* ── Helpers ─────────────────────────────────────────────────────────────── */

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  function setFieldState(input, errorEl, message) {
    if (message) {
      input.classList.add("invalid");
      input.classList.remove("valid");
      errorEl.textContent = message;
    } else {
      input.classList.remove("invalid");
      input.classList.add("valid");
      errorEl.textContent = "";
    }
  }

  function clearFieldState(input, errorEl) {
    input.classList.remove("invalid", "valid");
    errorEl.textContent = "";
  }

  /* ── Validation ──────────────────────────────────────────────────────────── */

  function validateEmail() {
    const value = emailInput.value.trim();
    if (!value) {
      setFieldState(emailInput, emailError, "Email address is required.");
      return false;
    }
    if (!isValidEmail(value)) {
      setFieldState(emailInput, emailError, "Please enter a valid email address.");
      return false;
    }
    setFieldState(emailInput, emailError, "");
    return true;
  }

  function validatePassword() {
    const value = passwordInput.value;
    if (!value) {
      setFieldState(passwordInput, passwordError, "Password is required.");
      return false;
    }
    if (value.length < 8) {
      setFieldState(passwordInput, passwordError, "Password must be at least 8 characters.");
      return false;
    }
    setFieldState(passwordInput, passwordError, "");
    return true;
  }

  /* ── Live validation on blur ─────────────────────────────────────────────── */

  emailInput.addEventListener("blur", validateEmail);
  passwordInput.addEventListener("blur", validatePassword);

  emailInput.addEventListener("input", function () {
    if (emailInput.classList.contains("invalid")) validateEmail();
    else clearFieldState(emailInput, emailError);
  });

  passwordInput.addEventListener("input", function () {
    if (passwordInput.classList.contains("invalid")) validatePassword();
    else clearFieldState(passwordInput, passwordError);
  });

  /* ── Toggle password visibility ──────────────────────────────────────────── */

  togglePasswordBtn.addEventListener("click", function () {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    togglePasswordBtn.querySelector(".eye-icon").classList.toggle("hidden", isPassword);
    togglePasswordBtn.querySelector(".eye-off-icon").classList.toggle("hidden", !isPassword);
    togglePasswordBtn.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
  });

  /* ── Form submission ─────────────────────────────────────────────────────── */

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const emailOk = validateEmail();
    const passwordOk = validatePassword();

    if (!emailOk || !passwordOk) {
      const firstInvalid = form.querySelector(".invalid");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    /* Simulate an async login request */
    setLoading(true);
    setTimeout(function () {
      setLoading(false);
      /* In a real app you would submit credentials to a server here. */
      showSuccessState();
    }, 1500);
  });

  /* ── UI state helpers ────────────────────────────────────────────────────── */

  function setLoading(isLoading) {
    submitBtn.disabled = isLoading;
    btnText.textContent = isLoading ? "Signing in…" : "Sign in";
    btnSpinner.classList.toggle("hidden", !isLoading);
  }

  function showSuccessState() {
    btnText.textContent = "✓ Signed in";
    submitBtn.style.background = "linear-gradient(135deg, #22c55e, #16a34a)";
    submitBtn.disabled = true;
  }
})();
