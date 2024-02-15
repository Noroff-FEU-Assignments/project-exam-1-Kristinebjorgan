// About content
export function fetchAboutPageContent() {
  const apiUrl = `https://talesofpalestine.kristinebjorgan.com/wp-json/wp/v2/pages/45`;

  return fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Fetched About page data:", data);
      return data;
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
}

// Displays content and clickable links
export function displayAboutPageContent(data) {
  const aboutContentElement = document.querySelector(".about-content");
  const linksContainer = document.querySelector(".links-container");
  if (aboutContentElement && linksContainer) {
    // Check if both containers exist
    let aboutContentHTML = "";
    if (data.content && data.content.rendered) {
      aboutContentHTML = data.content.rendered;
    } else if (data.acf) {
      // ACF fields
      if (data.acf.title) {
        aboutContentHTML += `<h1>${data.acf.title}</h1>`;
      }
      if (data.acf.subtitle) {
        aboutContentHTML += `<h2>${data.acf.subtitle}</h2>`;
      }
      if (data.acf.about_image && data.acf.about_image.url) {
        aboutContentHTML += `<img src="${
          data.acf.about_image.sizes.medium
        }" alt="${data.acf.about_image.alt || "About Image"}" />`;
      }
      if (data.acf.mission) {
        aboutContentHTML += `<p>${data.acf.mission}</p>`;
      }
      if (data.acf.about_image2 && data.acf.about_image2.url) {
        aboutContentHTML += `<img src="${
          data.acf.about_image2.sizes.medium
        }" alt="${data.acf.about_image2.alt || "About Image2"}" />`;
      }
      if (data.acf.vision) {
        aboutContentHTML += `<p>${data.acf.vision}</p>`;
      }
      if (data.acf.about_image3 && data.acf.about_image3.url) {
        aboutContentHTML += `<img src="${
          data.acf.about_image3.sizes.medium
        }" alt="${data.acf.about_image3.alt || "About Image3"}" />`;
      }
      if (data.acf.about) {
        aboutContentHTML += `<p>${data.acf.about}</p>`;
      }
      if (data.acf.thank) {
        aboutContentHTML += `<p>${data.acf.thank}</p>`;
      }
    } else {
      console.error("The 'About' page has no content.");
    }
    aboutContentElement.innerHTML = aboutContentHTML;

    // Append links to the links container
    clickableLinks(
      data.acf.contact,
      data.acf.instagram,
      data.acf.donations,
      linksContainer
    );
  } else {
    console.error(
      "Element with class 'about-content' or 'links-container' was not found."
    );
  }
}

// clickable links in about
export function clickableLinks(email, instagram, donations, linksContainer) {
  // Email, instagram, donations
  if (email) {
    const emailLink = document.createElement("a");
    emailLink.href = `mailto:${email}`;
    emailLink.textContent = "Mail";
    linksContainer.appendChild(emailLink);
    linksContainer.appendChild(document.createElement("br"));
  }

  if (instagram) {
    const instagramLink = document.createElement("a");
    instagramLink.href = instagram;
    instagramLink.textContent = "Instagram";
    instagramLink.target = "_blank";
    linksContainer.appendChild(instagramLink);
    linksContainer.appendChild(document.createElement("br"));
  }

  if (donations) {
    const donationsLink = document.createElement("a");
    donationsLink.href = donations;
    donationsLink.textContent = "Donations";
    donationsLink.target = "_blank";
    linksContainer.appendChild(donationsLink);
  }
}

// truncated index version

export function fetchTruncatedAboutContent() {
  const truncatedApiUrl = `https://talesofpalestine.kristinebjorgan.com/wp-json/wp/v2/pages/45`;
  return fetch(truncatedApiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Failed to fetch truncated about content:", error);
    });
}

export function displayTruncatedAboutContent(data) {
  const container = document.getElementById("index-about-content");
  if (!container) {
    throw new Error("index-about-content not found.");
  }

  console.log("Data received for truncation:", data);
  const maxLength = 200;
  let content = "";

  if (data.content && data.content.rendered) {
    content = data.content.rendered;
  } else if (data.acf && data.acf.about) {
    content = data.acf.about;
  } else {
    console.error("No content found in the data.");
    return;
  }

  let aboutContentHTML = "";

  // Title
  if (data.acf.title) {
    aboutContentHTML += `<h1>${data.acf.title}</h1>`;
  }

  // Subtitle
  if (data.acf.subtitle) {
    aboutContentHTML += `<h2>${data.acf.subtitle}</h2>`;
  }

  // About Image
  if (data.acf.about_image && data.acf.about_image.url) {
    aboutContentHTML += `<img src="${data.acf.about_image.sizes.medium}" alt="${
      data.acf.about_image.alt || "About Image"
    }" />`;
  }

  // Mission
  if (data.acf.mission) {
    aboutContentHTML += `<p>${data.acf.mission}</p>`;
  }

  // Truncate the content
  let truncatedContent =
    content.length > maxLength
      ? `<span>${content.substring(0, maxLength)}...</span>`
      : `<span>${content}</span>`;

  // Here's the 'Read More' button as a string of HTML
  const readMoreButton = `<a href="about.html" class="read-more-button">Read more</a>`;

  // Now the button is appended after the truncated content
  aboutContentHTML += truncatedContent + readMoreButton;

  // Set the content to the container
  container.innerHTML = aboutContentHTML;
}
