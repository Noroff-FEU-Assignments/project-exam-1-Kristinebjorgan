// GENERAL DATA
//import
import { openModal } from "./modal.js";
import {
  truncateText,
  blogPostIdFromUrl,
  apiBaseUrl,
  sanitizeHTML,
  sanitizeURL,
} from "./utilities.js";

// number of posts
const initialPosts = 9;
const additionalPosts = 3;

// variables
let isExpanded = false;
let offset = 0;

//FUNCTIONS

// fetch blogposts
export function fetchBlogs(perPage = 9, offset = 0, categoryId = "") {
  return new Promise((resolve, reject) => {
    let fetchUrl = `${apiBaseUrl}/?per_page=${perPage}&offset=${offset}`;
    if (categoryId) {
      fetchUrl += `&categories=${sanitizeHTML(categoryId.trim())}`;
    }

    fetch(fetchUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Not found");
        }
        return response.json();
      })
      .then((posts) => {
        const container = document.getElementById("blog-content");
        if (!container) {
          throw new Error(
            'The container element with ID "blog-content" was not found.'
          );
        }

        if (offset === 0) {
          container.innerHTML = "";
        }

        posts.forEach((post) => {
          const postElement = document.createElement("div");
          postElement.classList.add("blog-post");

          postElement.dataset.postData = JSON.stringify({
            acf: {
              blogpost_image: sanitizeURL(post.acf.blogpost_image),
              blogpost_poem: sanitizeHTML(post.acf.blogpost_poem),
              artwork_title: sanitizeHTML(post.acf.artwork_title),
              blogpost_author: sanitizeHTML(post.acf.blogpost_author),
            },
            id: post.id,
          });

          // post elements w sanitizing
          buildPostElement(post, postElement);

          container.appendChild(postElement);
        });

        adjustViewMoreVisibility(posts.length, perPage);
        resolve(posts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error.message);
        reject(error);
      });
  });
}

function buildPostElement(post, postElement) {
  // Date
  const dateElement = createSanitizedElement(
    "p",
    "blog-post-date",
    post.acf.date
  );
  postElement.appendChild(dateElement);

  // Artwork Title
  const artworkTitleElement = createSanitizedElement(
    "h2",
    "blog-post-artwork-title",
    post.acf.artwork_title
  );
  postElement.appendChild(artworkTitleElement);

  // Poem
  const poem = truncateText(sanitizeHTML(post.acf.blogpost_poem), 200);
  const poemElement = createSanitizedElement(
    "div",
    "blog-post-poem",
    poem,
    true
  );
  postElement.appendChild(poemElement);

  // Author Title
  const titleElement = createSanitizedElement(
    "p",
    "blog-post-author",
    `By ${post.acf.blogpost_author}`
  );
  postElement.appendChild(titleElement);

  // Read more link
  const readMoreLink = document.createElement("a");
  readMoreLink.href = `blogpost.html?postId=${post.id}`;
  readMoreLink.textContent = "Read more";
  readMoreLink.classList.add("read-more");
  postElement.appendChild(readMoreLink);

  // Open modal
  postElement.addEventListener("click", (event) => {
    if (!event.target.classList.contains("read-more")) {
      const postData = JSON.parse(event.currentTarget.dataset.postData);
      openModal(postData);
    }
  });
}

// View more
function adjustViewMoreVisibility(postsLength, perPage) {
  const viewMoreButton = document.getElementById("view-more");
  if (viewMoreButton) {
    viewMoreButton.style.display = postsLength < perPage ? "none" : "block";
  }
}

// Return sanitized elements
function createSanitizedElement(tag, className, content, isHTML = false) {
  const element = document.createElement(tag);
  element.className = className;
  if (isHTML) {
    element.innerHTML = sanitizeHTML(content);
  } else {
    element.textContent = content;
  }
  return element;
}

//Filter categories
export function categoryFilters() {
  const filterButtons = document.querySelectorAll(".filter-button");
  const clearButton = document.querySelector(".clear-filters");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      // Remove active class
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class
      this.classList.add("active");

      // Fetch the blogs based on the category
      const categoryId = this.getAttribute("data-category-id");
      document.getElementById("blog-content").innerHTML = "";
      fetchBlogs(9, 0, categoryId);
    });
  });
  if (clearButton) {
    clearButton.addEventListener("click", function (event) {
      event.preventDefault();

      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Fetch all blogs without any category filter
      document.getElementById("blog-content").innerHTML = "";
      fetchBlogs(9, 0, ""); //
    });
  }
}

// view more / view less
export function activeViewMoreButton() {
  const viewMoreButton = document.getElementById("view-more");
  if (viewMoreButton) {
    viewMoreButton.addEventListener("click", function () {
      if (!isExpanded) {
        fetchBlogs(initialPosts + additionalPosts, offset)
          .then((numberOfPostsFetched) => {
            viewMoreButton.style.display =
              numberOfPostsFetched < initialPosts + additionalPosts
                ? "none"
                : "block";
            viewMoreButton.textContent = isExpanded ? "View More" : "View Less";
            isExpanded = !isExpanded;
          })
          .catch((error) => console.error("Error loading more posts:", error));
      } else {
        fetchBlogs(initialPosts, 0)
          .then(() => {
            viewMoreButton.textContent = "View More";
            isExpanded = false;
          })
          .catch((error) =>
            console.error("Error resetting posts view:", error)
          );
      }
    });
  } else {
    console.error("The 'View More' button was not found.");
  }
}

// BLOGPOSTS

export function populateBlogPost() {
  const postId = blogPostIdFromUrl();
  if (!postId) {
    console.error("Blog post ID not found.");
    return;
  }

  const fetchUrl = `${apiBaseUrl}${sanitizeURL(postId)}`;

  fetch(fetchUrl)
    .then((response) => {
      if (!response.ok) throw new Error("Response not OK");
      return response.json();
    })
    .then((blogPostData) => {
      const container = document.getElementById("blogpost-container");
      if (!container) {
        console.error("Blog post container not found.");
        return;
      }

      container.innerHTML = "";

      // Dynamically append elements
      appendElement(
        container,
        "h1",
        "blogpost-title",
        sanitizeHTML(blogPostData.acf.artwork_title)
      );
      appendElement(
        container,
        "h2",
        "blogpost-author",
        `By: ${sanitizeHTML(blogPostData.acf.blogpost_author)}`
      );
      appendElement(
        container,
        "p",
        "blogpost-date",
        sanitizeHTML(blogPostData.acf.date)
      );
      appendImage(
        container,
        "blogpost-image",
        sanitizeURL(blogPostData.acf.blogpost_image),
        sanitizeHTML(blogPostData.acf.artwork_title)
      );
      appendElement(
        container,
        "div",
        "blogpost-poem",
        sanitizeHTML(blogPostData.acf.blogpost_poem),
        true
      );
      appendElement(
        container,
        "div",
        "blogpost-quote",
        sanitizeHTML(blogPostData.acf.quote),
        true
      );
      // Bio + image
      const bioImageContainer = document.createElement("div");
      bioImageContainer.className = "bio-image-container";

      const textElement = document.createElement("div");
      textElement.className = "blogpost-text";
      textElement.innerHTML = sanitizeHTML(blogPostData.acf.blogpost_text);
      bioImageContainer.appendChild(textElement);

      const imageElement = document.createElement("img");
      imageElement.src = sanitizeURL(blogPostData.acf.portrait);
      imageElement.className = "blogpost-image2";
      bioImageContainer.appendChild(imageElement);

      container.appendChild(bioImageContainer);
    })
    .catch((error) => {
      console.error("Error fetching blog post content:", error.message);
    });
}

// Append an element to the container
function appendElement(
  container,
  elementType,
  className,
  content,
  isHTML = false
) {
  const element = document.createElement(elementType);
  element.className = className;
  if (isHTML) {
    element.innerHTML = sanitizeHTML(content);
  } else {
    element.textContent = content;
  }
  container.appendChild(element);
}

// Append an image to the container
function appendImage(container, className, src, alt) {
  if (!src) return; // Only proceed if 'src' is truthy
  const image = document.createElement("img");
  image.className = className;
  image.src = sanitizeURL(src);
  image.alt = sanitizeHTML(alt);
  container.appendChild(image);
}
