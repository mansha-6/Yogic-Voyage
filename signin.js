document.addEventListener("DOMContentLoaded", function () {
    const signinForm = document.getElementById("signin-form");
    const emailInput = document.getElementById("email"); // ✅ Corrected ID
    const passwordInput = document.getElementById("password"); // ✅ Corrected ID
    const signinErrorMessage = document.getElementById("signin-error");
    const togglePassword = document.querySelector(".toggle-password i");

    if (!signinForm || !emailInput || !passwordInput || !signinErrorMessage) {
        console.error("❌ One or more elements not found in the DOM!");
        return;
    }

    const API_BASE_URL = "https://yogic-voyage-backend.vercel.app";

    signinForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent page refresh

        signinErrorMessage.textContent = "";

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            signinErrorMessage.textContent = "⚠️ Please enter both email and password.";
            signinErrorMessage.style.color = "red";
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/auth/signin`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                signinErrorMessage.textContent = "✅ Sign-In Successful! Redirecting...";
                signinErrorMessage.style.color = "green";
                setTimeout(() => window.location.replace("index.html"), 2000);
            } else {
                signinErrorMessage.textContent = `⚠️ ${data.error || "Invalid email or password"}`;
                signinErrorMessage.style.color = "red";
            }
        } catch (error) {
            signinErrorMessage.textContent = "⚠️ Server error. Please try again later.";
            signinErrorMessage.style.color = "red";
            console.error("Error:", error);
        }
    });

    if (togglePassword) {
        togglePassword.addEventListener("click", function () {
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                togglePassword.classList.replace("fa-eye", "fa-eye-slash");
            } else {
                passwordInput.type = "password";
                togglePassword.classList.replace("fa-eye-slash", "fa-eye");
            }
        });
    }
});
