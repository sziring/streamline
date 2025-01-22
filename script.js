// script.js

// Fetch and render projects from JSON
document.addEventListener("DOMContentLoaded", () => {
    const projectShowcase = document.getElementById("project-showcase");

    fetch("projects.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch projects.json");
            }
            return response.json();
        })
        .then(projects => {
            projects.forEach(project => {
                const projectContainer = document.createElement("div");
                projectContainer.classList.add("project-container");

                const projectTitle = document.createElement("h2");
                projectTitle.classList.add("project-title");
                projectTitle.textContent = project.title;

                const carousel = document.createElement("div");
                carousel.classList.add("carousel");

                const carouselImages = document.createElement("div");
                carouselImages.classList.add("carousel-images");

                project.images.forEach(image => {
                    const img = document.createElement("img");
                    img.src = image;
                    img.alt = `${project.title} Image`;
                    carouselImages.appendChild(img);
                });

                const prevButton = document.createElement("button");
                prevButton.classList.add("carousel-prev");
                prevButton.innerHTML = "&#10094;";

                const nextButton = document.createElement("button");
                nextButton.classList.add("carousel-next");
                nextButton.innerHTML = "&#10095;";

                const dotsContainer = document.createElement("div");
                dotsContainer.classList.add("carousel-dots");
                project.images.forEach((_, index) => {
                    const dot = document.createElement("button");
                    dot.classList.add("carousel-dot");
                    if (index === 0) dot.classList.add("active");
                    dotsContainer.appendChild(dot);
                });

                carousel.appendChild(carouselImages);
                carousel.appendChild(prevButton);
                carousel.appendChild(nextButton);
                carousel.appendChild(dotsContainer);

                projectContainer.appendChild(projectTitle);
                projectContainer.appendChild(carousel);
                projectShowcase.appendChild(projectContainer);

                setupCarousel(carousel);
            });
        })
        .catch(error => console.error("Error loading projects:", error));
});

function setupCarousel(carousel) {
    const imagesContainer = carousel.querySelector(".carousel-images");
    const images = imagesContainer.querySelectorAll("img");
    const prevButton = carousel.querySelector(".carousel-prev");
    const nextButton = carousel.querySelector(".carousel-next");
    const dots = carousel.querySelectorAll(".carousel-dot");

    let currentIndex = 0;

    function showImage(index) {
        imagesContainer.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });
    }

    prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        showImage(currentIndex);
    });

    nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        showImage(currentIndex);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentIndex = index;
            showImage(currentIndex);
        });
    });

    // Initialize the first image
    imagesContainer.style.display = "flex";
    imagesContainer.style.transition = "transform 0.5s ease-in-out";
    showImage(currentIndex);
}

// JavaScript for Hamburger Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
  
    // Toggle menu on hamburger click
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  
    // Close menu when clicking a link
    navMenu.addEventListener("click", (event) => {
      if (event.target.tagName === "A") {
        navMenu.classList.remove("active");
      }
    });
  
    // Close menu when clicking outside of it
    document.addEventListener("click", (event) => {
      if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
        navMenu.classList.remove("active");
      }
    });
  });