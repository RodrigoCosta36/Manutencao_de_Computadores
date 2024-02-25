
document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.querySelector(".menu-icon");
  const navList = document.querySelector(".nav-list");

  menuIcon.addEventListener("click", function () {
    navList.classList.toggle("show");
  });

  const navItems = document.querySelectorAll(".nav-list li");

  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      navList.classList.remove("show");
    });
  });

  const images = document.querySelectorAll(".image-effect");

  function checkVisibility() {
    images.forEach((image) => {
      const rect = image.getBoundingClientRect();
      const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;
      if (isVisible && !image.classList.contains("show")) {
        image.classList.add("show");
      }
    });
  }

  window.addEventListener("scroll", checkVisibility);
  window.addEventListener("resize", checkVisibility);

  document.addEventListener("DOMContentLoaded", checkVisibility);
  checkVisibility();
});