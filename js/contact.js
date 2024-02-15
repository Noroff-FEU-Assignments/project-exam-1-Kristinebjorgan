import { validateEmail } from "./utilities.js";

// Function to validate the form on submission
export function validateForm(event) {
  event.preventDefault(); // Stop the form from submitting

  // Get form input values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  // Reset error messages
  const errorElements = document.querySelectorAll(".error");
  errorElements.forEach((element) => {
    element.textContent = "";
  });

  // Start validation
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

  // Message validation - Note the typo correction from 'lenght' to 'length'
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
