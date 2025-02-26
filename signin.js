document.getElementById("signin-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form from refreshing the page

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const signinErrorMessage = document.getElementById("signin-error");

    // ✅ Clear previous messages
    signinErrorMessage.textContent = "";

    try {
        const response = await fetch("https://yogic-voyage-backend.vercel.app/auth/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            signinErrorMessage.textContent = "✅ Sign-In Successful! Redirecting...";
            signinErrorMessage.style.color = "green";

            // ✅ Redirect to Dashboard or Home Page after 2 seconds
            setTimeout(() => {
                window.location.replace("index.html"); // Change as needed
            }, 2000);
        } else {
            signinErrorMessage.textContent = `⚠️ ${data.error || "Invalid email or password"}`;
            signinErrorMessage.style.color = "red";
        }
    } catch (error) {
        signinErrorMessage.textContent = "⚠️ Something went wrong. Please try again.";
        signinErrorMessage.style.color = "red";
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password");
    const togglePassword = document.querySelector(".toggle-password i");

    togglePassword.addEventListener("click", function () {
        if (passwordInput.type === "password") {
            passwordInput.type = "text"; // Show password
            togglePassword.classList.remove("fa-eye");
            togglePassword.classList.add("fa-eye-slash"); // Eye with Slash
        } else {
            passwordInput.type = "password"; // Hide password
            togglePassword.classList.remove("fa-eye-slash");
            togglePassword.classList.add("fa-eye"); // Regular Eye
        }
    });
});
