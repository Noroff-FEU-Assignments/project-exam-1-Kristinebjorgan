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

  //Modal
  const modal = document.getElementById("modal");
  if (modal) {
    initModal();
  }

  //Checking if the container exists before running the code

  // Fetch and display about content for the about page
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

  // Initialize category filters
  if (
    document.getElementById("blog-content") &&
    document.querySelectorAll(".filter-button").length > 0
  ) {
    categoryFilters();
  }

  // Fetch and display truncated about content for the index page
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

  // Populate the carousel
  if (document.getElementById("blogCarousel")) {
    populateCarousel();
    carouselNavigation();
  }

  // Loader
  const loader = document.querySelector(".loader");
  if (loader) {
    loader.style.display = "none";
  }

  // Contact form
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      validateForm(event);
    });
  }

  // Fetch blogs, about page content, and populate blog post
  if (document.getElementById("blog-content")) {
    fetchBlogs();
    activeViewMoreButton();
    blogPostIdFromUrl();
  }

  if (document.getElementById("blogpost-container")) {
    populateBlogPost();
  }
});

// Back button
const backButton = document.getElementById("back");
if (backButton) {
  backButton.addEventListener("click", goBack);
}

// Hamburger menu toggle
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".subhead-nav");

  if (document.body.contains(hamburger) && document.body.contains(nav)) {
    hamburger.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
  }
});

// Define site name
const siteName = "Tales of Palestine";

// Define page titles for each page
const homePageTitle = "Home";
const aboutPageTitle = "About Us";
const contactPageTitle = "Contact Us";
const blogpostsPageTitle = "Blogposts";
const specificBlogpostPageTitle = "Specific Blogpost";

// Determine current page title based on the page the user is on
let currentPageTitle;
switch (window.location.pathname) {
  case "/":
    currentPageTitle = homePageTitle;
    break;
  case "/about":
    currentPageTitle = aboutPageTitle;
    break;
  case "/contact":
    currentPageTitle = contactPageTitle;
    break;
  case "/blogposts":
    currentPageTitle = blogpostsPageTitle;
    break;
  // Add other cases for additional pages as needed
  default:
    currentPageTitle = siteName; // Fallback to site name for unknown pages
}

// Set the dynamic page title
document.title = `${siteName} | ${currentPageTitle}`;

// Function to handle going back
function goBack() {
  window.history.back();
}
