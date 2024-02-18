//api Urls
export const apiAboutUrl = `https://talesofpalestine.kristinebjorgan.com/wp-json/wp/v2/pages/45`;
export const apiBaseUrl = `https://talesofpalestine.kristinebjorgan.com/wp-json/wp/v2/posts`;

//Sanitizing
export function sanitizeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/'/g, "&#039;");
}

// Sanitizing URLs
export function sanitizeURL(url) {
  const urlObj = new URL(url);
  return urlObj.href;
}

// Truncate text function
export function truncateText(text, length) {
  if (text.length <= length) {
    return text;
  } else {
    return text.substring(0, length) + "...";
  }
}

// Id from Url
export function blogPostIdFromUrl() {
  const queryParams = new URLSearchParams(window.location.search);
  return queryParams.get("postId");
}

// Validate email
export function validateEmail(email) {
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  return emailRegex.test(email);
}

//Newsletter
export function setupNewsletterForm() {
  const newsletterSubmitButton = document.getElementById("newsletter-submit");
  if (newsletterSubmitButton) {
    newsletterSubmitButton.addEventListener("click", function () {
      const emailInput = document.getElementById("newsletter-email");
      const messageDiv = document.getElementById("newsletter-message");

      // Validate email + provide feedback
      if (validateEmail(emailInput.value)) {
        messageDiv.textContent = "Thank you for subscribing!";
        messageDiv.style.color = "green";
        emailInput.value = "";
        messageDiv.textContent = "Please enter a valid email address.";
        messageDiv.style.color = "red";
      }
    });
  }
}
