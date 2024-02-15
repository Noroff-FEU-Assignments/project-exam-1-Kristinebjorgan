import { truncateText, blogPostIdFromUrl } from "./utilities.js";

let currentPage = 1;

export function populateCarousel(perPage = 4, carouselId = "blogCarousel") {
  const fetchUrl = `https://talesofpalestine.kristinebjorgan.com/wp-json/wp/v2/posts?per_page=${perPage}&page=${currentPage}`;

  fetch(fetchUrl)
    .then((response) => {
      if (!response.ok) {
        if (response.status === 404) {
          currentPage -= 1;
          throw new Error("No more posts to load");
        }
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((posts) => {
      const carouselContent = document.querySelector(
        `#${carouselId} .carousel-content`
      );
      if (!carouselContent) {
        console.error(
          `Carousel content container not found for ID: ${carouselId}`
        );
        return;
      }

      carouselContent.innerHTML = "";

      posts.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.classList.add("carousel-item");
        postElement.innerHTML = `
          <h3>${post.acf.artwork_title}</h3>
          <img src="${post.acf.blogpost_image}" alt="${post.title.rendered}" />
          <p>${truncateText(post.acf.blogpost_poem, 200)}</p>
          <a href="blogpost.html?postId=${
            post.id
          }" class="read-more">Read more</a>
        `;
        carouselContent.appendChild(postElement);
      });

      const totalItems = carouselContent.children.length;
      for (let i = 0; i < totalItems; i++) {
        const clone = carouselContent.children[i].cloneNode(true);
        clone.classList.add("clone");
        carouselContent.appendChild(clone);
        carouselContent.insertBefore(clone, carouselContent.firstChild);
      }
      carouselContent.style.transform = `translateX(-${
        (currentPage - 1) * 100
      }%)`;
    })
    .catch((error) => {
      console.error("Error fetching carousel posts:", error);
    });
}

// Call this function to set up the carousel with event listeners for navigation
export function carouselNavigation() {
  const carousel = document.getElementById("blogCarousel");
  const prevButton = carousel.querySelector(".carousel-prev");
  const nextButton = carousel.querySelector(".carousel-next");

  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage -= 1;
      populateCarousel();
    }
  });

  nextButton.addEventListener("click", () => {
    // Assuming there's a way to check if there are more posts; if API provides total pages or posts count
    currentPage += 1;
    populateCarousel();
  });
}
