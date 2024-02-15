// Open modal
export function openModal(post) {
  console.log("Opening modal for post:", post); // Debugging statement
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  const modalText = document.getElementById("modalText");
  const modalTitle = document.getElementById("modalTitle");
  const modalAuthor = document.getElementById("modalAuthor");

  // Check if the modal and its elements exist
  if (modal && modalImg && modalText && modalTitle && modalAuthor) {
    console.log("Modal and its content elements exist.");
    modalImg.src = post.acf.blogpost_image;
    modalText.innerHTML = post.acf.blogpost_poem;
    modalTitle.innerHTML = post.acf.artwork_title;
    modalAuthor.innerHTML = `By ${post.acf.blogpost_author}`;
    modal.style.display = "block";
    console.log("Modal should be displayed now.");
  } else {
    console.error("Modal or its content elements were not found.");
  }

  console.log("openModal function called.");
}

// Close the modal
export function closeModal() {
  const modal = document.getElementById("modal");
  if (modal) {
    modal.style.display = "none"; // Hide the modal
  }
}

// Initialize modal functionality
export function initModal() {
  const modal = document.getElementById("modal");
  const closeBtn = document.querySelector(".modal .close");

  // Close when the close button is clicked
  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
    modal.style.display = "none";
  } else {
    console.error("The close button was not found.");
  }

  // Close when clicked outside the modal content
  window.addEventListener("click", (event) => {
    if (event.target == modal) {
      closeModal();
    }
  });
}
