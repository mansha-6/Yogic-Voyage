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



// -----------------------------------
const texts = ["Yoga", "Meditation", "Breathwork", "Ayurveda"];
const images = ["images/yogaunsplash.jpg", "images/mediunsplash.jpg", "images/breatheunsplash.jpg", "images/ayurunsplash.jpg"];
let index = 0;

function changeContent() {
    document.getElementById("changing-text").innerHTML = texts.map((word, i) => 
        i === index ? `<span style="color:#ff7f50; font-weight:bold;">${word}</span>` : word
    ).join(" / ");
    
    document.getElementById("animated-img").src = images[index];

    index = (index + 1) % texts.length;
}

setInterval(changeContent, 3000);

document.querySelector('.sign-in').addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default link behavior if necessary
    window.location.href = "signin.html"; // Redirect to Sign In page
});

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

document.querySelector('.view-workouts').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default anchor behavior
    window.location.href = "workout.html"; // Redirect to workout page
});

document.querySelector('.view-programs').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default anchor behavior
    window.location.href = "ourprogram.html"; // Redirect to workout page
});