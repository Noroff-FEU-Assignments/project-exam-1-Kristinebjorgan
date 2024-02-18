// Imports
import { validateEmail, sanitizeHTML } from "./utilities.js";

// Validate form
export function validateForm(event) {
  event.preventDefault();

  // Get form input values
  const name = sanitizeHTML(document.getElementById("name").value);
  const email = sanitizeHTML(document.getElementById("email").value);
  const subject = sanitizeHTML(document.getElementById("subject").value);
  const message = sanitizeHTML(document.getElementById("message").value);

  // Reset error messages
  const errorElements = document.querySelectorAll(".error");
  errorElements.forEach((element) => {
    element.textContent = "";
  });

  //validation
  let isValid = true;

  // Name validation
  if (name.length < 5) {
    document.getElementById("name-error").textContent =
      "Name should be more than 5 characters long";
    isValid = false;
  }

  // Email validation
  if (!validateEmail(email)) {
    document.getElementById("email-error").textContent =
      "Invalid email address";
    isValid = false;
  }

  // Subject validation
  if (subject.length < 15) {
    document.getElementById("subject-error").textContent =
      "Subject should be more than 15 characters long";
    isValid = false;
  }

  // Message validation
  if (message.length < 25) {
    document.getElementById("message-error").textContent =
      "Message should be more than 25 characters long";
    isValid = false;
  }

  // If all validations pass
  if (isValid) {
    alert("Sent!");
    document.getElementById("contact-form").reset();
  }
}
