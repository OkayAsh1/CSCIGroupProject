// Wait until the page fully loads before running JavaScript
document.addEventListener("DOMContentLoaded", function () {

    // -------------------------------
    // SIGN UP PAGE LOGIC
    // -------------------------------

    const signupForm = document.getElementById("signupForm");

    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();

            // Grab user input values
            const name = document.getElementById("signupName").value.trim();
            const email = document.getElementById("signupEmail").value.trim().toLowerCase();
            const password = document.getElementById("signupPassword").value;
            const confirmPassword = document.getElementById("confirmPassword").value;
            const signupMessage = document.getElementById("signupMessage");

            // Pull existing users from localStorage
            // If none exist yet, start with an empty array
            let users = JSON.parse(localStorage.getItem("fuelFitUsers")) || [];

            // Basic validation
            if (name === "" || email === "" || password === "" || confirmPassword === "") {
                signupMessage.textContent = "Please fill in all fields.";
                signupMessage.style.color = "red";
                return;
            }

            if (password !== confirmPassword) {
                signupMessage.textContent = "Passwords do not match.";
                signupMessage.style.color = "red";
                return;
            }

            // Check if that email is already registered
            const existingUser = users.find(function (user) {
                return user.email === email;
            });

            if (existingUser) {
                signupMessage.textContent = "An account with that email already exists.";
                signupMessage.style.color = "red";
                return;
            }

            // Create a new user object
            const newUser = {
                name: name,
                email: email,
                password: password
            };

            // Save the new user into the array
            users.push(newUser);

            // Save updated user list back into localStorage
            localStorage.setItem("fuelFitUsers", JSON.stringify(users));

            // Success message
            signupMessage.textContent = "Account created successfully! Redirecting to login...";
            signupMessage.style.color = "green";

            // Clear the form
            signupForm.reset();

            // Redirect to login page after a short delay
            setTimeout(function () {
                window.location.href = "login.html";
            }, 1500);
        });
    }

    // -------------------------------
    // LOGIN PAGE LOGIC
    // -------------------------------

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            // Grab login input values
            const email = document.getElementById("loginEmail").value.trim().toLowerCase();
            const password = document.getElementById("loginPassword").value;
            const loginMessage = document.getElementById("loginMessage");

            // Pull saved users from localStorage
            let users = JSON.parse(localStorage.getItem("fuelFitUsers")) || [];

            // Look for a matching account
            const matchedUser = users.find(function (user) {
                return user.email === email && user.password === password;
            });

            if (matchedUser) {
                // Save the currently logged-in user
                localStorage.setItem("currentFuelFitUser", JSON.stringify(matchedUser));

                loginMessage.textContent = "Login successful! Redirecting to home page...";
                loginMessage.style.color = "green";

                // Redirect to home page
                setTimeout(function () {
                    window.location.href = "index.html";
                }, 1500);
            } else {
                loginMessage.textContent = "Invalid email or password.";
                loginMessage.style.color = "red";
            }
        });
    }

});