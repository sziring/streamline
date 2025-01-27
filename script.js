document.addEventListener("DOMContentLoaded", () => {
  const projectShowcase = document.querySelector(".project-showcase");

  // Fetch projects.json and handle errors
  const fetchProjects = async () => {
    try {
      const response = await fetch("projects.json");
      if (!response.ok) throw new Error("Error fetching projects.json");
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  };

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

      // Add images to the carousel
      project.images.forEach((image) => {
        const img = document.createElement("img");
        img.src = image;
        img.alt = `Project ${index + 1} Image`;
        carouselImages.appendChild(img);
      });

      // Add videos to the carousel
      if (project.videos) {
        project.videos.forEach((videoUrl) => {
          const iframe = document.createElement("iframe");
          iframe.src = `${videoUrl}?rel=0&modestbranding=1&playsinline=1`;
          iframe.allow =
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
          iframe.allowFullscreen = true;
          iframe.classList.add("carousel-video");
          carouselImages.appendChild(iframe);
        });
      }

      // Carousel controls
      const prevButton = document.createElement("button");
      prevButton.classList.add("carousel-prev");
      prevButton.innerText = "❮";

      const nextButton = document.createElement("button");
      nextButton.classList.add("carousel-next");
      nextButton.innerText = "❯";

      const dotsContainer = document.createElement("div");
      dotsContainer.classList.add("carousel-dots");
      const totalItems = project.images.length + (project.videos ? project.videos.length : 0);

      for (let i = 0; i < totalItems; i++) {
        const dot = document.createElement("button");
        dot.classList.add("carousel-dot");
        if (i === 0) dot.classList.add("active");
        dotsContainer.appendChild(dot);
      }

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

  const setupCarousel = (carousel) => {
    const imagesContainer = carousel.querySelector(".carousel-images");
    const items = imagesContainer.querySelectorAll("img, iframe");
    const prevButton = carousel.querySelector(".carousel-prev");
    const nextButton = carousel.querySelector(".carousel-next");
    const dots = carousel.querySelectorAll(".carousel-dot");
    let currentIndex = 0;

    const showItem = (index) => {
      imagesContainer.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
    };

    prevButton.addEventListener("click", () => {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
      showItem(currentIndex);
    });

    nextButton.addEventListener("click", () => {
      currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
      showItem(currentIndex);
    });

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentIndex = index;
        showItem(currentIndex);
      });
    });

    showItem(currentIndex); // Initialize the first item
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