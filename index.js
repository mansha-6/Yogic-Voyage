// Handle Free Trial form submission
document.getElementById("trialForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form default submission
    const email = document.getElementById("email").value;

    if (email) {
        window.location.href = "trial.html"; // Redirect to Free Trial page
    } else {
        const messageContainer = document.getElementById("message-container");
        messageContainer.textContent = "Please enter a valid email address.";
        messageContainer.style.color = "red"; // Show an inline error message
    }
});

// Handle Sign In redirection
document.querySelector('.signin-box').addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default link behavior if necessary
    window.location.href = "signin.html"; // Redirect to Sign In page
});