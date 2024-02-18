export function toggleHeaderOnScroll() {
  window.addEventListener("scroll", function () {
    var mainHead = document.querySelector(".main-head");
    var subHead = document.querySelector(".subhead");
    var scrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;

    if (scrollPosition > 220) {
      mainHead.classList.add("hidden");
      subHead.classList.remove("hidden");
    } else {
      mainHead.classList.remove("hidden");
      subHead.classList.add("hidden");
    }
  });
}

//active navlinks
export function currentNavLink() {
  let currentPageUrl = window.location.pathname; // Get the full pathname
  const navLinks = document.querySelectorAll(".sub-navlink");

  navLinks.forEach((link) => {
    const linkUrl = link.getAttribute("href");
    // Check if the current page URL is equal to the link URL
    if (
      (currentPageUrl === linkUrl && currentPageUrl !== "/") || // Check for non-homepage links
      (currentPageUrl === "/" && linkUrl === "/index.html") || // Check for homepage link
      (currentPageUrl.endsWith("/") &&
        currentPageUrl + "index.html" === linkUrl) // Check for homepage with trailing slash
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}
