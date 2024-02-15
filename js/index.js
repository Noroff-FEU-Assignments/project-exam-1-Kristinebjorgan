// IMPORTS
import {
  fetchBlogs,
  activeViewMoreButton,
  populateBlogPost,
} from "./blogposts.js";
import { toggleHeaderOnScroll, currentNavLink } from "./navigation.js";
import { validateForm } from "./contact.js";
import {
  fetchAboutPageContent,
  displayAboutPageContent,
  clickableLinks,
  fetchTruncatedAboutContent,
  displayTruncatedAboutContent,
} from "./about.js";
import { initModal } from "./modal.js";
import { populateCarousel, carouselNavigation } from "./carousel.js";
import { validateEmail } from "./utilities.js";
import { setupNewsletterForm } from "./newsletter.js";

document.addEventListener("DOMContentLoaded", function () {
  toggleHeaderOnScroll();
  currentNavLink();
  clickableLinks();
  initModal();
  setupNewsletterForm();

  // Fetch and display full about content for the about page, if the container exists
  const aboutContentContainer = document.getElementById("about-content");
  if (aboutContentContainer) {
    fetchAboutPageContent()
      .then((data) => {
        if (data) {
          displayAboutPageContent(data);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch full about content:", error);
      });
  }

  // Fetch and display truncated about content for the index page, if the container exists
  const indexAboutContentContainer = document.getElementById(
    "index-about-content"
  );
  if (indexAboutContentContainer) {
    fetchTruncatedAboutContent()
      .then((truncatedData) => {
        if (truncatedData) {
          displayTruncatedAboutContent(truncatedData);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch truncated about content:", error);
      });
  }

  // The carousel should only be populated if the carousel container exists
  if (document.getElementById("blogCarousel")) {
    populateCarousel();
    carouselNavigation();
  }

  // Check if the loader exists
  const loader = document.querySelector(".loader");
  if (loader) {
    loader.style.display = "none";
  }

  // Check if the contact form exists
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      validateForm(event);
    });
  }

  // Check if the back button exists
  const backButton = document.getElementById("back");
  if (backButton) {
    backButton.addEventListener("click", goBack);
  }

  // Fetch blogs, about page content, and populate blog post only if they are present on the page
  if (document.getElementById("blog-content")) {
    fetchBlogs();
    activeViewMoreButton();
    blogPostIdFromUrl();
  }

  if (document.getElementById("blogpost-container")) {
    populateBlogPost(); // This should execute when on blogpost.html
  }
});

// Function to handle going back
function goBack() {
  window.history.back();
}