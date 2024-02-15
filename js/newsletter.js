import { validateEmail } from "./utilities.js";

export function setupNewsletterForm() {
  const newsletterSubmitButton = document.getElementById("newsletter-submit");
  if (newsletterSubmitButton) {
    newsletterSubmitButton.addEventListener("click", function () {
      const emailInput = document.getElementById("newsletter-email");
      const messageDiv = document.getElementById("newsletter-message");

      // Validate the email and provide feedback
      if (validateEmail(emailInput.value)) {
        // If email is valid, you can later implement AJAX request here
        messageDiv.textContent = "Thank you for subscribing!";
        messageDiv.style.color = "green"; // Success message in green
        emailInput.value = ""; // Clear the input field
      } else {
        // If email is not valid, show an error message
        messageDiv.textContent = "Please enter a valid email address.";
        messageDiv.style.color = "red"; // Error message in red
      }
    });
  }
}
