(function ($) {
    "use strict";

    /*--------------------------------------------------------------
      1. Owl Carousel Initialization
    --------------------------------------------------------------*/
    $(document).ready(function () {
        if ($(".owl-carousel.sliders").length) {
            $(".owl-carousel.sliders").owlCarousel({
                items: 1,
                loop: true,
                margin: 0,
                nav: true,
                dots: true,
                autoplay: false,
                autoplayTimeout: 5000,
                smartSpeed: 1000,
                animateOut: 'fadeOut',
                navText: ["<i class='fa fa-arrow-left'></i>", "<i class='fa fa-arrow-right'></i>"],
                responsive: {
                    0: {
                        nav: false
                    },
                    768: {
                        nav: true
                    }
                }
            });
        }
    });


    /*--------------------------------------------------------------
      2. Scroll & Sticky Header Logic
    --------------------------------------------------------------*/
    $(window).on("scroll", function () {
        var scrollTop = $(window).scrollTop();

        // Standard Sticky Menu
        if ($(".stricked-menu").length) {
            var headerScrollPos = 130;
            if (scrollTop > headerScrollPos) {
                $(".stricked-menu").addClass("stricky-fixed");
            } else {
                $(".stricked-menu").removeClass("stricky-fixed");
            }
        }

        // One Page Sticky Menu
        if ($(".sticky-header--one-page").length) {
            var onePageScrollPos = 130;
            if (scrollTop > onePageScrollPos) {
                $(".sticky-header--one-page").addClass("active");
            } else {
                $(".sticky-header--one-page").removeClass("active");
            }
        }

        // Scroll to Top Toggle
        if ($(".scroll-to-top").length) {
            if (scrollTop > 500) {
                $(".scroll-to-top").addClass("is-visible");
            } else {
                $(".scroll-to-top").removeClass("is-visible");
            }
        }
    });

    /*--------------------------------------------------------------
      3. Mobile Navigation & Sub-menus
    --------------------------------------------------------------*/
    // Clone Nav Content
    if ($(".mobile-nav__container").length && $(".main-menu__list").length) {
        let navContent = $(".main-menu__list").get(0).outerHTML;
        $(".mobile-nav__container").html(navContent);
    }

    // Sticky Header Clone
    if ($(".sticky-header__content").length && $(".main-menu").length) {
        let navContent = $(".main-menu").html();
        $(".sticky-header__content").html(navContent);
    }

    // Toggle Wrapper
    if ($(".mobile-nav__toggler").length) {
        $(".mobile-nav__toggler").on("click", function (e) {
            e.preventDefault();
            $(".mobile-nav__wrapper").toggleClass("expanded");
            $("body").toggleClass("locked");
        });
    }

    // Dropdown Toggler Creation
    if ($(".mobile-nav__container .main-menu__list").length) {
        $(".mobile-nav__container .main-menu__list .dropdown > a").each(function () {
            let self = $(this);
            let toggleBtn = document.createElement("BUTTON");
            toggleBtn.setAttribute("aria-label", "dropdown toggler");
            toggleBtn.innerHTML = "<i class='fa fa-angle-down'></i>";
            self.append(toggleBtn);

            $(toggleBtn).on("click", function (e) {
                e.preventDefault();
                $(this).toggleClass("expanded");
                $(this).parent().parent().toggleClass("expanded");
                $(this).parent().parent().children("ul").slideToggle();
            });
        });
    }

    /*--------------------------------------------------------------
      4. Search Popup Logic
    --------------------------------------------------------------*/
    $(document).on("click", ".search-toggler", function (e) {
        e.preventDefault();
        $("body").addClass("search-active");
        setTimeout(() => {
            const input = document.querySelector('.search-popup input[type="search"]');
            if (input) input.focus();
        }, 500);
    });

    $('#customers-teams').owlCarousel({
        loop: true,
        center: true,
        items: 3,
        margin: 0,
        autoplay: true,
        dots: false,
        nav: true, // Enable navigation
        navText: ['<i class="fas fa-arrow-left"></i>', '<i class="fas fa-arrow-right"></i>'],
        autoplayTimeout: 4500,
        checkVisibility: true,
        responsive: {
            0: {
                items: 1,
                nav: false // Keep it off for mobile to avoid layout breaks
            },
            768: {
                items: 1,
                nav: false // Keep it off for mobile to avoid layout breaks
            },
            1024: {
                items: 3,
                nav: true
            },
            1170: {
                items: 4,
                nav: true
            }
        }
    });

})(jQuery);

/*--------------------------------------------------------------
  5. Native JS Features (Outside jQuery)
--------------------------------------------------------------*/

// Tabs Logic
function openTab(evt, tabName) {
    const contents = document.getElementsByClassName("tab-content");
    for (let content of contents) {
        content.classList.remove("active");
    }
    const links = document.getElementsByClassName("nav-link");
    for (let link of links) {
        link.classList.remove("active");
    }
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// Stats Counter with Intersection Observer
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.run-counter');

    const animateCounter = (canvas) => {
        const target = +canvas.getAttribute('data-target');
        const duration = 1500;
        const increment = target / (duration / 16);

        let current = 0;
        const update = () => {
            current += increment;
            if (current < target) {
                canvas.innerText = Math.ceil(current);
                requestAnimationFrame(update);
            } else {
                canvas.innerText = target;
            }
        };
        update();
    };

    const observerOptions = {
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(c => observer.observe(c));
});