// Truncate text function (make sure this is correctly implemented)
export function truncateText(text, length) {
  if (text.length <= length) {
    return text;
  } else {
    return text.substring(0, length) + "...";
  }
}

// SPECIFIC BLOGPOST
export function blogPostIdFromUrl() {
  const queryParams = new URLSearchParams(window.location.search);
  return queryParams.get("postId");
}

// Function to validate email
export function validateEmail(email) {
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  return emailRegex.test(email);
}