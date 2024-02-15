// GENERAL DATA
//importa
import { openModal } from "./modal.js";
import { truncateText, blogPostIdFromUrl } from "./utilities.js";

// number of posts
const initialPosts = 9;
const additionalPosts = 3;

// variable for current state
let isExpanded = false;
let offset = 0;

//FUNCTIONS

// fetch blogposts
export function fetchBlogs(perPage = 9, offset = 0) {
  console.log("fetchBlogs called");
  return new Promise((resolve, reject) => {
    const fetchUrl = `https://talesofpalestine.kristinebjorgan.com/wp-json/wp/v2/posts?per_page=${perPage}&offset=${offset}`;
    fetch(fetchUrl)
      .then((response) => {
        console.log("Response received", response);
        if (!response.ok) {
          throw new Error("Not found");
        }
        return response.json();
      })
      .then((posts) => {
        console.log("Posts resolved", posts);
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
              blogpost_image: post.acf.blogpost_image,
              blogpost_poem: post.acf.blogpost_poem,
              artwork_title: post.acf.artwork_title,
              blogpost_author: post.acf.blogpost_author,
            },
            id: post.id,
          });

          // Date
          if (post.acf.date) {
            const dateElement = document.createElement("p");
            dateElement.classList.add("blog-post-date");
            dateElement.textContent = post.acf.date;
            postElement.appendChild(dateElement);
          }

          // Artwork Title
          if (post.acf.artwork_title) {
            const artworkTitleElement = document.createElement("h2");
            artworkTitleElement.classList.add("blog-post-artwork-title");
            artworkTitleElement.textContent = post.acf.artwork_title;
            postElement.appendChild(artworkTitleElement);
          }

          // Poem
          if (post.acf.blogpost_poem) {
            const poemElement = document.createElement("div");
            poemElement.classList.add("blog-post-poem");

            // Truncate the poem
            const truncatedPoem = truncateText(post.acf.blogpost_poem, 200);

            poemElement.innerHTML = truncatedPoem;
            postElement.appendChild(poemElement);
          }

          // Title
          if (post.acf.blogpost_author) {
            const titleElement = document.createElement("p");
            titleElement.classList.add("blog-post-author");
            titleElement.textContent = `By ${post.acf.blogpost_author}`;
            postElement.appendChild(titleElement);
          }

          // Read more link
          const readMoreLink = document.createElement("a");
          readMoreLink.href = `blogpost.html?postId=${post.id}`;
          readMoreLink.textContent = "Read more";
          readMoreLink.classList.add("read-more");
          postElement.appendChild(readMoreLink);
          container.appendChild(postElement);

          // Exclude "Read more" from triggering the modal
          postElement.addEventListener("click", (event) => {
            if (!event.target.classList.contains("read-more")) {
              const postData = JSON.parse(event.currentTarget.dataset.postData);
              openModal(postData);
            }
          });

          container.appendChild(postElement);
        });

        if (posts.length < perPage) {
          document.getElementById("view-more").style.display = "none";
        } else {
          document.getElementById("view-more").style.display = "block";
        }

        resolve(posts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        reject(error);
      });
  });
}

// VIEW MORE / VIEW LESS
export function activeViewMoreButton() {
  const viewMoreButton = document.getElementById("view-more");
  if (viewMoreButton) {
    viewMoreButton.addEventListener("click", function () {
      if (!isExpanded) {
        fetchBlogs(initialPosts + additionalPosts, offset)
          .then((numberOfPostsFetched) => {
            if (numberOfPostsFetched < initialPosts + additionalPosts) {
              viewMoreButton.style.display = "none"; // Hide the button if there are no more posts
            }
            viewMoreButton.textContent = "View Less";
            isExpanded = true;
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        // Go back to showing only the initial 9 posts
        fetchBlogs(initialPosts, 0) // Reset offset to 0
          .then(() => {
            viewMoreButton.textContent = "View More";
            isExpanded = false;
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    });
  } else {
    console.error("The 'View More' button was not found.");
  }
}

// BLOGPOSTS

export function populateBlogPost() {
  const postId = blogPostIdFromUrl();
  if (postId) {
    fetch(
      `https://talesofpalestine.kristinebjorgan.com/wp-json/wp/v2/posts/${postId}`
    )
      .then((response) => response.json())
      .then((blogPostData) => {
        const container = document.getElementById("blogpost-container");
        container.innerHTML = "";

        appendElement(
          container,
          "h1",
          "blogpost-title",
          blogPostData.acf.artwork_title
        );
        appendElement(
          container,
          "h2",
          "blogpost-title",
          `By: ${blogPostData.acf.blogpost_author}`
        );
        appendElement(container, "p", "blogpost-date", blogPostData.acf.date);
        appendImage(
          container,
          "blogpost-image",
          blogPostData.acf.blogpost_image,
          blogPostData.acf.artwork_title
        );
        appendElement(
          container,
          "div",
          "blogpost-poem",
          blogPostData.acf.blogpost_poem,
          true
        );
        appendElement(
          container,
          "div",
          "blogpost-quote",
          blogPostData.acf.quote,
          true
        );

        // bio + image
        const bioImageContainer = document.createElement("div");
        bioImageContainer.className = "bio-image-container";

        const textElement = document.createElement("div");
        textElement.className = "blogpost-text";
        textElement.innerHTML = blogPostData.acf.blogpost_text;
        bioImageContainer.appendChild(textElement);

        const imageElement = document.createElement("img");
        imageElement.src = blogPostData.acf.portrait;
        imageElement.className = "blogpost-image2";
        bioImageContainer.appendChild(imageElement);

        // Append to the main container
        container.appendChild(bioImageContainer);
      })
      .catch((error) => {
        console.error("Error fetching blog post content:", error);
      });
  }
}

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
    element.innerHTML = content;
  } else {
    element.textContent = content;
  }
  container.appendChild(element);
}

function appendImage(container, className, src, alt) {
  const image = document.createElement("img");
  image.className = className;
  image.src = src;
  image.alt = alt;
  container.appendChild(image);
}
