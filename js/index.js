// IMPORTS
import {
  blogPostIdFromUrl,
  setupNewsletterForm,
  apiAboutUrl,
  apiBaseUrl,
} from "./utilities.js";
import { toggleHeaderOnScroll, currentNavLink } from "./navigation.js";
import { validateForm } from "./contact.js";
import { initModal } from "./modal.js";
import { populateCarousel, carouselNavigation } from "./carousel.js";
import {
  fetchBlogs,
  activeViewMoreButton,
  populateBlogPost,
  categoryFilters,
} from "./blogposts.js";
import {
  fetchAboutPageContent,
  displayAboutPageContent,
  clickableLinks,
  fetchTruncatedAboutContent,
  displayTruncatedAboutContent,
} from "./about.js";

document.addEventListener("DOMContentLoaded", function () {
  toggleHeaderOnScroll();
  currentNavLink();
  clickableLinks();
  setupNewsletterForm();
  categoryFilters();

  //modal
  const modal = document.getElementById("modal");
  if (modal) {
    initModal();
  }

  // Fetch and display about content for the about page, if the container exists
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
        aboutContentContainer.textContent =
          "Sorry, we’re unable to load the content right now. Please try again later.";
      });
  }

  // Initialize category filters if on a page with blog content
  if (
    document.getElementById("blog-content") &&
    document.querySelectorAll(".filter-button").length > 0
  ) {
    categoryFilters();
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
    populateBlogPost();
  }
});

// hamburger menu toggle
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".subhead-nav");

  // Only add the event listener if both elements are present
  if (document.body.contains(hamburger) && document.body.contains(nav)) {
    hamburger.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
  }
});

// Function to handle going back
function goBack() {
  window.history.back();
}

// Get the current page title (e.g., "Home", "About", "Contact", etc.)
const currentPageTitle = document.title;

// Set the site name
const siteName = "Tales of Palestine";

// Concatenate the site name and the current page title with a vertical line separator
const pageTitle = `${siteName} | ${currentPageTitle}`;

// Set the dynamic page title
document.title = pageTitle;