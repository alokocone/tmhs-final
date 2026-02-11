(function ($) {
    "use strict";

    // 1. Owl Carousel Initialization
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

    // 2. Scroll Events (Combined Logic)
    $(window).on("scroll", function () {
        var scrollTop = $(window).scrollTop();

        // Sticky Header Logic
        if ($(".stricked-menu").length) {
            var headerScrollPos = 130;
            var stricky = $(".stricked-menu");
            if (scrollTop > headerScrollPos) {
                stricky.addClass("stricky-fixed");
            } else {
                stricky.removeClass("stricky-fixed");
            }
        }

        // Scroll to Top Visibility Toggle
        if ($(".scroll-to-top").length) {
            if (scrollTop > 500) {
                // We use addClass as requested. 
                // Note: Removed .fadeIn() to prevent it from adding "display:block" which breaks CSS transitions
                $(".scroll-to-top").addClass("is-visible");
            } else {
                $(".scroll-to-top").removeClass("is-visible");
            }
        }
    });

    // 3. Mobile Nav Logic (Cloning & Toggling)
    if ($(".mobile-nav__container").length && $(".main-menu__list").length) {
        let navContent = $(".main-menu__list").get(0).outerHTML;
        $(".mobile-nav__container").html(navContent);
    }

    if ($(".mobile-nav__toggler").length) {
        $(".mobile-nav__toggler").on("click", function (e) {
            e.preventDefault();
            $(".mobile-nav__wrapper").toggleClass("expanded");
            $("body").toggleClass("locked");
        });
    }

    // 4. Mobile Sub-menu Toggle
    if ($(".mobile-nav__container .main-menu__list").length) {
        $(".mobile-nav__container .main-menu__list .dropdown > a").each(function () {
            let self = $(this);
            let toggleBtn = document.createElement("BUTTON");
            toggleBtn.setAttribute("aria-label", "dropdown toggler");
            toggleBtn.innerHTML = "<i class='fa fa-angle-down'></i>";
            self.append(toggleBtn);

            self.find("button").on("click", function (e) {
                e.preventDefault();
                $(this).toggleClass("expanded");
                $(this).parent().parent().toggleClass("expanded");
                $(this).parent().parent().children("ul").slideToggle();
            });
        });
    }



    /*--------------------------------------------------------------
    Sticky Header Handler
  --------------------------------------------------------------*/


    // Sticky header
    if ($(".sticky-header__content").length) {
        let navContent = $(".main-menu").html();
        let mobileNavContainer = $(".sticky-header__content");
        mobileNavContainer.html(navContent);
    }


    const handleStickyHeader = throttle(function () {
        try {
            const $strickedMenu = $(".stricked-menu");
            const $stickyHeaderOnePage = $(".sticky-header--one-page");
            const headerScrollPos = 300;
            const onePageScrollPos = 130;
            const scrollTop = $window.scrollTop();

            // Regular sticky header
            if ($strickedMenu.length) {
                if (scrollTop > headerScrollPos) {
                    $strickedMenu.addClass("stricky-fixed");
                } else {
                    $strickedMenu.removeClass("stricky-fixed");
                }
            }

            // One page sticky header
            if ($stickyHeaderOnePage.length) {
                if (scrollTop > onePageScrollPos) {
                    $stickyHeaderOnePage.addClass("active");
                } else {
                    $stickyHeaderOnePage.removeClass("active");
                }
            }
        } catch (error) {
            console.warn('Sticky header handling failed:', error);
        }
    }, 16);
    

    // Inside your click listener
if (searchBtn) {
    event.preventDefault();
    document.body.classList.add('search-active');
    
    // Focus the input after a short delay (to allow the slide animation)
    setTimeout(() => {
        const input = document.querySelector('.search-popup input[type="search"]');
        if (input) input.focus();
    }, 500); 
}

function openTab(evt, tabName) {
  // 1. Hide all tab content
  const contents = document.getElementsByClassName("tab-content");
  for (let content of contents) {
    content.classList.remove("active");
  }

  // 2. Remove "active" class from all buttons
  const links = document.getElementsByClassName("nav-link");
  for (let link of links) {
    link.classList.remove("active");
  }

  // 3. Show current tab and add active class to the button
  document.getElementById(tabName).classList.add("active");
  evt.currentTarget.classList.add("active");
}

})(jQuery);

