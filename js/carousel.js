// Imports
import { truncateText, apiBaseUrl } from "./utilities.js";

export let currentPage = 1;
export const perPage = 4;

// Carousel
export function populateCarousel(
  perPage = 4,
  currentPage = 1,
  carouselId = "blogCarousel"
) {
  if (!Number.isInteger(currentPage) || currentPage < 1) {
    console.error("currentPage must be a positive integer.");
    return;
  }

  const fetchUrl = `${apiBaseUrl}?per_page=${perPage}&page=${currentPage}`;
  fetch(fetchUrl)
    .then((response) => {
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("No more posts to load");
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
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
      console.error("Error fetching carousel posts:", error.message, error);
    });
}

// Eventlisteners for next and prev
export function carouselNavigation() {
  const carousel = document.getElementById("blogCarousel");
  const prevButton = carousel.querySelector(".carousel-prev");
  const nextButton = carousel.querySelector(".carousel-next");

  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage -= 1;
      populateCarousel(perPage, currentPage, "blogCarousel");
    }
  });

  nextButton.addEventListener("click", () => {
    currentPage += 1;
    populateCarousel(perPage, currentPage, "blogCarousel");
  });
}
