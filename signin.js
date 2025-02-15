document.getElementById("signin-form").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent page reload

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:5000/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
        alert("Sign-In Successful!");
        window.location.href = data.redirect;  // Redirect to main.html
    } else {
        alert("Sign-In Failed: " + data);
    }
});
db = connect("mongodb://localhost:27017/yoga_users");
db.users.insertOne({ email: "test@example.com", password: "123456" });

document.getElementById("signInBtn").addEventListener("click", function() {
    // Perform validation if needed
    window.location.href = "main.html"; // Redirect to main.html
    
});