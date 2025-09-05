// Fake credentials storage
let users = JSON.parse(localStorage.getItem("users")) || [];

// SIGNUP FUNCTION
function signupUser(event) {
  event.preventDefault();

  const username = document.getElementById("signup-username").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const confirm = document.getElementById("signup-confirm").value;

  if (password !== confirm) {
    document.getElementById("signup-error").textContent = "Passwords do not match!";
    return false;
  }

  // check if user exists
  if (users.find(u => u.username === username || u.email === email)) {
    document.getElementById("signup-error").textContent = "User already exists!";
    return false;
  }

  // save user
  users.push({ username, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Account created successfully! Please login.");
  window.location.href = "login.html";
  return true;
}

// LOGIN FUNCTION (update to use registered users)
function loginUser(event) {
  event.preventDefault();
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  let foundUser = users.find(u => u.username === user && u.password === pass);

  if (foundUser) {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(foundUser));
    window.location.href = "index.html";
  } else {
    document.getElementById("error").textContent = "Invalid username or password!";
  }
}

// LOGOUT
function logout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}
