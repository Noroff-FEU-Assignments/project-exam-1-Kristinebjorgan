//Header on scroll
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

//Active navlinks
export function currentNavLink() {
  let currentPageUrl = window.location.pathname;
  const navLinks = document.querySelectorAll(".sub-navlink");

  navLinks.forEach((link) => {
    const linkUrl = link.getAttribute("href");
    if (
      (currentPageUrl === linkUrl && currentPageUrl !== "/") ||
      (currentPageUrl === "/" && linkUrl === "/index.html") ||
      (currentPageUrl.endsWith("/") &&
        currentPageUrl + "index.html" === linkUrl)
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}
