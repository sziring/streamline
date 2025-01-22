document.addEventListener("DOMContentLoaded", () => {
    const projectShowcase = document.querySelector(".project-showcase");
  
    // Function to fetch JSON and handle errors
    const fetchProjects = async () => {
      try {
        const response = await fetch("projects.json"); // Ensure the correct path
        if (!response.ok) {
          throw new Error(`Error fetching projects.json: ${response.status} ${response.statusText}`);
        }
        return await response.json();
      } catch (error) {
        console.error("Failed to fetch projects:", error.message);
        return []; // Return an empty array if there's an error
      }
    };
  
    // Function to dynamically generate projects
    const renderProjects = (projects) => {
      if (projects.length === 0) {
        projectShowcase.innerHTML = "<p>Unable to load projects at this time.</p>";
        return;
      }
  
      projects.forEach((project, index) => {
        const projectContainer = document.createElement("div");
        projectContainer.classList.add("project-container");
  
        // Carousel
        const carousel = document.createElement("div");
        carousel.classList.add("carousel");
  
        const carouselImages = document.createElement("div");
        carouselImages.classList.add("carousel-images");
  
        project.images.forEach((image) => {
          const img = document.createElement("img");
          img.src = image;
          img.alt = `Project ${index + 1} Image`;
  
          // Handle image load error
          img.onerror = () => {
            console.error(`Failed to load image: ${image}`);
            img.src = "placeholder.jpg"; // Replace with a placeholder image
          };
  
          carouselImages.appendChild(img);
        });
  
        // Carousel controls
        const prevButton = document.createElement("button");
        prevButton.classList.add("carousel-prev");
        prevButton.innerText = "❮";
  
        const nextButton = document.createElement("button");
        nextButton.classList.add("carousel-next");
        nextButton.innerText = "❯";
  
        const dotsContainer = document.createElement("div");
        dotsContainer.classList.add("carousel-dots");
        project.images.forEach((_, dotIndex) => {
          const dot = document.createElement("button");
          dot.classList.add("carousel-dot");
          if (dotIndex === 0) dot.classList.add("active");
          dotsContainer.appendChild(dot);
        });
  
        // Append carousel components
        carousel.appendChild(carouselImages);
        carousel.appendChild(prevButton);
        carousel.appendChild(nextButton);
        carousel.appendChild(dotsContainer);
  
        // Content section
        const content = document.createElement("div");
        content.classList.add("project-content");
  
        const title = document.createElement("h2");
        title.classList.add("project-title");
        title.innerText = project.title;
  
        const description = document.createElement("p");
        description.classList.add("project-description");
        description.innerText = project.description;
  
        // Append content
        content.appendChild(title);
        content.appendChild(description);
  
        // Combine into project container
        projectContainer.appendChild(carousel);
        projectContainer.appendChild(content);
  
        // Add to the showcase
        projectShowcase.appendChild(projectContainer);
      });
  
      // Initialize carousels
      document.querySelectorAll(".carousel").forEach(setupCarousel);
    };
  
    // Carousel functionality
    const setupCarousel = (carousel) => {
      const imagesContainer = carousel.querySelector(".carousel-images");
      const images = imagesContainer.querySelectorAll("img");
      const prevButton = carousel.querySelector(".carousel-prev");
      const nextButton = carousel.querySelector(".carousel-next");
      const dots = carousel.querySelectorAll(".carousel-dot");
      let currentIndex = 0;
  
      const showImage = (index) => {
        imagesContainer.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
      };
  
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
  
      showImage(currentIndex); // Initialize the first image
    };
  
    // Fetch and render projects
    fetchProjects().then(renderProjects);
  });

  // JavaScript for Hamburger Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);
  
    // Toggle menu and overlay
    hamburger.addEventListener("click", () => {
      const isActive = navMenu.classList.toggle("active");
      overlay.classList.toggle("active", isActive);
      document.body.style.overflow = isActive ? "hidden" : "auto"; // Prevent scrolling
    });
  
    // Close menu and overlay when clicking on the overlay
    overlay.addEventListener("click", () => {
      navMenu.classList.remove("active");
      overlay.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  
    // Close menu when clicking on a menu link
    navMenu.addEventListener("click", (event) => {
      if (event.target.tagName === "A") {
        navMenu.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });
});