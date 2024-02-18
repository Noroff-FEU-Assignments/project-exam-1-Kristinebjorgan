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
    // Check if the current page URL contains the link URL
    if (currentPageUrl.includes(linkUrl)) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}
