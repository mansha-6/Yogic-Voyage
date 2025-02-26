document.addEventListener("DOMContentLoaded", function () {
    const signinForm = document.getElementById("signin-form");
    const emailInput = document.getElementById("signin-email");
    const passwordInput = document.getElementById("signin-password");
    const signinErrorMessage = document.getElementById("signin-error");
    const togglePassword = document.querySelector(".toggle-password i");

    // ✅ Handle Sign-In Form Submission
    signinForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent form refresh

        // ✅ Clear previous messages
        signinErrorMessage.textContent = "";

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // ✅ Check for empty fields
        if (!email || !password) {
            signinErrorMessage.textContent = "⚠️ Please enter both email and password.";
            signinErrorMessage.style.color = "red";
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include"  // Add this if using cookies/session
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
    togglePassword.addEventListener("click", function () {
        if (passwordInput.type === "password") {
            passwordInput.type = "text"; // Show password
            togglePassword.classList.replace("fa-eye", "fa-eye-slash");
        } else {
            passwordInput.type = "password"; // Hide password
            togglePassword.classList.replace("fa-eye-slash", "fa-eye");
        }
    });
});
