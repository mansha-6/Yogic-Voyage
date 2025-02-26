document.addEventListener("DOMContentLoaded", function () {
    const signinForm = document.getElementById("signin-form");
    const emailInput = document.getElementById("signin-email");
    const passwordInput = document.getElementById("signin-password");
    const signinErrorMessage = document.getElementById("signin-error");
    const togglePassword = document.querySelector(".toggle-password i");
    const API_BASE_URL = "https://yogic-voyage-backend.vercel.app"; // Replace with your actual backend URL

    // ✅ Handle Sign-In Form Submission
    signinForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent page refresh

        // ✅ Clear previous messages
        signinErrorMessage.textContent = "";

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // ✅ Validate Empty Fields
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
                credentials: "include",
            });

            const data = await response.json();

            if (response.ok) {
                signinErrorMessage.textContent = "✅ Sign-In Successful! Redirecting...";
                signinErrorMessage.style.color = "green";

                // ✅ Redirect after 2 seconds
                setTimeout(() => {
                    window.location.replace("index.html"); // Adjust as needed
                }, 2000);
            } else {
                signinErrorMessage.textContent = `⚠️ ${data.error || "Invalid email or password"}`;
                signinErrorMessage.style.color = "red";
            }
        } catch (error) {
            signinErrorMessage.textContent = "⚠️ Server error. Please try again later.";
            signinErrorMessage.style.color = "red";
        }
    });

    // ✅ Password Toggle Visibility
    if (togglePassword) {
        togglePassword.addEventListener("click", function () {
            if (passwordInput.type === "password") {
                passwordInput.type = "text"; // Show password
                togglePassword.classList.replace("fa-eye", "fa-eye-slash");
            } else {
                passwordInput.type = "password"; // Hide password
                togglePassword.classList.replace("fa-eye-slash", "fa-eye");
            }
        });
    }
});
