const umbrellaImage = document.getElementById("umbrellaImage");
const logoImage = document.getElementById("logoImage");
const fileInput = document.getElementById("fileInput");
const removeIcon = document.getElementById("removeIcon");
const loadingIcon = document.getElementById("loadingIcon");
const uploadIcon = document.getElementById("uploadIcon");
const uploadedIcon = document.getElementById("uploadedIcon");


// Umbrella Color Selection
document.querySelectorAll(".color-btn").forEach(btn => {
    btn.addEventListener("click", function () {
        document.querySelector(".color-btn.active").classList.remove("active");
        this.classList.add("active");

        // Show loading icon and hide umbrella with fade-out effect
        umbrellaImage.classList.remove("fade-in");
        umbrellaImage.classList.add("fade-out");

        // Show loading icon and hide logoImage with fade-out effect
        logoImage.classList.remove("fade-in");
        logoImage.classList.add("fade-out");

        // Change upload icon to loading icon in button
        uploadIcon.classList.add("hidden");
        uploadedIcon.classList.remove("hidden");

        setTimeout(() => {
            // Show loading icon and hide umbrella, logoImage
            loadingIcon.classList.remove("hidden");
            umbrellaImage.classList.add("hidden");
            logoImage.classList.add("hidden");
        }, 500); // delay


        const color = this.getAttribute("data-color");
        document.body.style.backgroundColor = color === "pink" ? "#ffe5f1" : color === "blue" ? "#eaf6ff" : "#fff9d6";

        const newColor = color === "pink" ? "#ff69b4" : color === "blue" ? "#1e90ff" : "#ffd700";

        loadingIcon.style.fill = newColor;


        // loading effect for 3 seconds
        setTimeout(() => {
            // Hide loading icon and show umbrella, logoImage
            loadingIcon.classList.add("hidden");
            umbrellaImage.classList.remove("hidden");
            logoImage.classList.remove("hidden");

            // Change umbrella image
            umbrellaImage.src = `images/${color}.png`;

            setTimeout(() => {
                // Show umbrella, logoImage and hide loading icon with fade-in effect
                umbrellaImage.classList.remove("fade-out");
                umbrellaImage.classList.add("fade-in");
                logoImage.classList.remove("fade-out");
                logoImage.classList.add("fade-in");

                // Change loading icon to upload icon in button
                uploadIcon.classList.remove("hidden");
                uploadedIcon.classList.add("hidden");
            }, 100); // delay 
        }, 3000); // delay 

        // Change upload button color
        uploadBtn.style.backgroundColor = color === "pink" ? "#ff69b4" : color === "blue" ? "#1e90ff" : "#ffd700";
    });
});

// Logo Upload
fileInput.addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (file) {
        if (!["image/png", "image/jpeg"].includes(file.type)) {
            alert("Only PNG and JPG files are allowed.");
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            alert("File size should not exceed 5MB.");
            return;
        }

        // Show loading icon and hide umbrella with fade-out effect
        umbrellaImage.classList.remove("fade-in");
        umbrellaImage.classList.add("fade-out");

        logoImage.style.display = "none";

        uploadIcon.classList.add("hidden");
        uploadedIcon.classList.remove("hidden");

        setTimeout(() => {
            // Show loading icon and hide umbrella
            loadingIcon.classList.remove("hidden");
            umbrellaImage.classList.add("hidden");
        }, 500); // Short delay to allow the new image to load


        const color = document.querySelector(".color-btn.active").getAttribute("data-color");
        // console.log("color", color)
        const newColor = color === "pink" ? "#ff69b4" : color === "blue" ? "#1e90ff" : "#ffd700";

        loadingIcon.style.fill = newColor;


        // Simulate loading effect for 5 seconds
        setTimeout(() => {
            // Hide loading icon and show umbrella
            loadingIcon.classList.add("hidden");
            umbrellaImage.classList.remove("hidden");

            // add logoImage in umbrellaImage
            const reader = new FileReader();
            reader.onload = function (e) {
                logoImage.src = e.target.result;
            };
            reader.readAsDataURL(file);

            setTimeout(() => {
                umbrellaImage.classList.remove("fade-out");
                umbrellaImage.classList.add("fade-in");

                logoImage.classList.remove("fade-out");
                logoImage.classList.add("fade-in");
                logoImage.style.display = "block";

                uploadIcon.classList.remove("hidden");
                uploadedIcon.classList.add("hidden");
            }, 100);
        }, 3000);


        // Update button text and show remove icon
        document.getElementById("uploadText").textContent = file.name;
        document.getElementById("removeIcon").classList.remove("hidden");

    }
});

// Remove Logo
removeIcon.addEventListener("click", function (event) {

    document.getElementById("fileInput").value = ""; // Clear file input
    document.getElementById("uploadText").textContent = "UPLOAD LOGO"; // Reset text
    removeIcon.classList.add("hidden"); // Hide remove icon

    logoImage.style.display = "none";
});
