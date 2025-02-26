document.getElementById("createAccountForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent form from refreshing

    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordStrength = document.getElementById("password-strength");
    const signupSuccess = document.getElementById("signup-success");

    // ✅ Check if fields are empty
    if (!firstName || !lastName || !email || !password) {
        signupSuccess.textContent = "⚠️ All fields are required!";
        signupSuccess.style.color = "red";
        return;
    }

    // ✅ Password Strength Check
    if (password.length < 8) {
        passwordStrength.textContent = "❌ Password must be at least 8 characters long.";
        passwordStrength.style.color = "red";
        return;
    } else {
        passwordStrength.textContent = "✅ Strong password.";
        passwordStrength.style.color = "green";
    }

    // ✅ Send Data to Backend
    try {
        const response = await fetch("http://localhost:3000/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
            credentials: "include"  // Add this if using cookies/session
        });
        

        const data = await response.json();

        if (response.ok) {
            signupSuccess.textContent = "✅ Account created successfully! Redirecting...";
            signupSuccess.style.color = "green";

            // ✅ Redirect to Sign-In Page after 2 seconds
            setTimeout(() => {
                window.location.replace("signin.html"); 
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

// ✅ Password Toggle for Signup & Signin
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".password-toggle").forEach(toggle => {
        toggle.addEventListener("click", function () {
            const passwordField = this.previousElementSibling;
            if (passwordField.type === "password") {
                passwordField.type = "text";
                this.classList.replace("fa-eye", "fa-eye-slash");
            } else {
                passwordField.type = "password";
                this.classList.replace("fa-eye-slash", "fa-eye");
            }
        });
    });
});

