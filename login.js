// login.js

// Get a reference to the form and its elements
const loginForm = document.querySelector('form');
const emailInput = document.querySelector('input[name="email"]');
const passwordInput = document.querySelector('input[name="password"]');

// Add a submit event listener to the form
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent the default form submission

  // Get the user's input values
  const email = emailInput.value;
  const password = passwordInput.value;

  // Create an object with the login data
  const loginData = {
    email: email,
    password: password,
  };

  try {
    const response = await fetch("https://dark-pink-eagle-tux.cyclic.cloud/user/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });
    if (response.status === 200) {
      const data = await response.json();
      const { token } = data;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("email", email);
      // Redirect to the admin page or perform any other action here
      window.location.href = "./admin.html";
    } else if (response.status === 201) {
      const data = await response.json();
      alert(data.msg);
    } else {
      alert("An error occurred while processing your request.");
    }
  } catch (error) {
    alert(error.message);
  }

});
