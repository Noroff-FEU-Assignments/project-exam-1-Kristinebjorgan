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

// Current nav link
export function currentNavLink() {
  const currentPageUrl = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".sub-navlink");

  navLinks.forEach((link) => {

    if (link.getAttribute("href") === currentPageUrl) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}
