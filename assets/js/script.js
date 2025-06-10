$(document).ready(function () {
  "use strict";

  const $window = $(window);
  const $navbar = $(".navbar");
  const $navLinks = $(".navbar-link");
  const $hamburger = $(".navbar-toggle");
  const $navMenu = $(".navbar-items");
  const $skillProgress = $(".skill-progress");
  const $contactForm = $("#contactForm");

  $window.on("scroll", function () {
    if ($window.scrollTop() > 50) {
      $navbar.addClass("scrolled");
    } else {
      $navbar.removeClass("scrolled");
    }
  });

  // Mobile menu toggle
  $hamburger.on("click", function () {
    $(this).toggleClass("active");
    $navMenu.toggleClass("active");

    const $bars = $(this).find(".bar");
    if ($(this).hasClass("active")) {
      $bars.eq(0).css("transform", "rotate(45deg) translate(5px, 5px)");
      $bars.eq(1).css("opacity", "0");
      $bars.eq(2).css("transform", "rotate(-45deg) translate(7px, -6px)");
      $("body").css("overflow", "hidden"); // Hide scrollbar when menu is open
    } else {
      $bars.css({
        transform: "none",
        opacity: "1",
      });
      $("body").css("overflow", "auto"); // Show scrollbar when menu is closed
    }
  });

  $navLinks.on("click", function () {
    if ($hamburger.hasClass("active")) {
      $hamburger.trigger("click");
    }
  });

  $window.on("scroll", function () {
    const scrollPos = $window.scrollTop() + 150;

    $navLinks.each(function () {
      const $this = $(this);
      const target = $this.attr("href");
      const $section = $(target);

      if ($section.length) {
        const sectionTop = $section.offset().top;
        const sectionBottom = sectionTop + $section.outerHeight();

        if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
          $navLinks.removeClass("active");
          $this.addClass("active");
        }
      }
    });
  });

  $contactForm.on("submit", function (e) {
    e.preventDefault();

    const formData = {
      subject: $("#subject").val(),
      message: $("#message").val(),
    };

    if (!formData.subject || !formData.message) {
      showNotification("Vui lòng điền đầy đủ thông tin!", "error");
      return;
    }

    const mailtoLink = `mailto:locnt0940@ut.edu.vn?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(formData.message)}`;

    window.location.href = mailtoLink;

    $contactForm[0].reset();
    showNotification("Đang mở ứng dụng email của bạn...", "success");
  });

  function animateSkillBars() {
    $skillProgress.each(function () {
      const $this = $(this);
      const skillTop = $this.offset().top;
      const skillBottom = skillTop + $this.outerHeight();
      const windowTop = $window.scrollTop();
      const windowBottom = windowTop + $window.height();

      if (skillBottom >= windowTop && skillTop <= windowBottom) {
        const width = $this.data("width");
        $this.animate(
          {
            width: width + "%",
          },
          1500,
          "easeOutQuart"
        );
      }
    });
  }

  $.easing.easeInOutQuart = function (x, t, b, c, d) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t + b;
    return (-c / 2) * ((t -= 2) * t * t * t - 2) + b;
  };

  $.easing.easeOutQuart = function (x, t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
  };

  // Trigger animation on page load and scroll
  animateSkillBars();
  $window.on("scroll", animateSkillBars);
});
