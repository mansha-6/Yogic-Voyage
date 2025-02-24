document.getElementById("createAccountForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent form from refreshing

    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordStrength = document.getElementById("password-strength");
    const signupSuccess = document.getElementById("signup-success");

    // ✅ Password Strength Check
    if (password.length < 8) {
        passwordStrength.textContent = "❌ Password must be at least 8 characters long.";
        passwordStrength.style.color = "red";
        return; // Stop form submission
    } else {
        passwordStrength.textContent = "✅ Strong password.";
        passwordStrength.style.color = "green";
    }

    // ✅ Send Data to Backend
    try {
        const response = await fetch("http://localhost:3000/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstName, lastName, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            signupSuccess.textContent = "✅ Account created successfully! Redirecting...";
            signupSuccess.style.color = "green";

            // ✅ Redirect to Sign-In Page after 2 seconds
            setTimeout(() => {
                window.location.href = "signin.html"; 
            }, 2000);
        } else {
            signupSuccess.textContent = "❌ " + (data.error || "Something went wrong.");
            signupSuccess.style.color = "red";
        }
    } catch (error) {
        signupSuccess.textContent = "❌ Error: Unable to connect to server.";
        signupSuccess.style.color = "red";
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const passwordField = document.getElementById("password");
    const togglePassword = document.querySelector(".password-toggle-icon i");

    togglePassword.addEventListener("click", function () {
        if (passwordField.type === "password") {
            passwordField.type = "text"; // Show password
            togglePassword.classList.remove("fa-eye");
            togglePassword.classList.add("fa-eye-slash"); // Eye with Slash
        } else {
            passwordField.type = "password"; // Hide password
            togglePassword.classList.remove("fa-eye-slash");
            togglePassword.classList.add("fa-eye"); // Regular Eye
        }
    });
});
