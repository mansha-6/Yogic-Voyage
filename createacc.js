document.addEventListener("DOMContentLoaded", function () {
    const createAccountForm = document.getElementById("createAccountForm");
    const firstNameInput = document.getElementById("first-name");
    const lastNameInput = document.getElementById("last-name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const passwordStrength = document.getElementById("password-strength");
    const signupSuccess = document.getElementById("signup-success");
    const API_BASE_URL = "https://yogic-voyage-backend.vercel.app"; // ✅ Removed extra slash

    // ✅ Handle Sign-Up Form Submission
    createAccountForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent page reload

        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // ✅ Validate Fields
        if (!firstName || !lastName || !email || !password) {
            signupSuccess.textContent = "⚠️ All fields are required!";
            signupSuccess.style.color = "red";
            return;
        }

        // ✅ Check Password Strength
        if (password.length < 8) {
            passwordStrength.textContent = "❌ Password must be at least 8 characters.";
            passwordStrength.style.color = "red";
            return;
        } else {
            passwordStrength.textContent = "✅ Strong password.";
            passwordStrength.style.color = "green";
        }

        // ✅ Send Data to Backend
        try {
            const response = await fetch(`${API_BASE_URL}/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ firstName, lastName, email, password }),
            });

            const data = await response.json(); // ✅ Parse response properly

            if (response.ok) {
                signupSuccess.textContent = "✅ Account created successfully! Redirecting...";
                signupSuccess.style.color = "green";

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
            console.error("Error:", error);
        }
    });

    // ✅ Password Toggle Feature
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
}); // ✅ Properly closed function
