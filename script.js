/* =========================================================
   SINHASSAN 104
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       PRELOADER
    ===================================================== */

    const preloader = document.getElementById("preloader");

    if (preloader) {
        window.addEventListener("load", function () {
            setTimeout(function () {
                preloader.classList.add("hide");

                setTimeout(function () {
                    preloader.style.display = "none";
                }, 850);

            }, 700);
        });

        /* Fallback in case window load is delayed */
        setTimeout(function () {
            preloader.classList.add("hide");

            setTimeout(function () {
                preloader.style.display = "none";
            }, 850);

        }, 3000);
    }


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    const siteHeader = document.getElementById("siteHeader");

    function handleHeaderScroll() {

        if (!siteHeader) return;

        if (window.scrollY > 40) {
            siteHeader.classList.add("scrolled");
        } else {
            siteHeader.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleHeaderScroll);

    handleHeaderScroll();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const mobileNav = document.getElementById("mobileNav");

    if (menuToggle && mobileNav) {

        menuToggle.addEventListener("click", function () {

            mobileNav.classList.toggle("active");

            document.body.classList.toggle("no-scroll");

        });


        /* Close menu after clicking a link */

        const mobileLinks = mobileNav.querySelectorAll("a");

        mobileLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                mobileNav.classList.remove("active");

                document.body.classList.remove("no-scroll");

            });

        });

    }


    /* =====================================================
       FAQ ACCORDION
    ===================================================== */

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(function (item) {

        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        if (!question || !answer) return;

        question.addEventListener("click", function () {

            const isActive = item.classList.contains("active");


            /* Close all other FAQ items */

            faqItems.forEach(function (otherItem) {

                if (otherItem !== item) {

                    otherItem.classList.remove("active");

                    const otherAnswer =
                        otherItem.querySelector(".faq-answer");

                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = null;
                    }
                }

            });


            /* Open clicked item */

            if (!isActive) {

                item.classList.add("active");

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

            } else {

                item.classList.remove("active");

                answer.style.maxHeight = null;

            }

        });

    });


    /* =====================================================
       GALLERY LIGHTBOX
       
       Uses 3.jpg - 11.jpg
       ===================================================== */

    const galleryItems =
        document.querySelectorAll(".gallery-item");

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxClose =
        document.getElementById("lightboxClose");

    const lightboxPrev =
        document.getElementById("lightboxPrev");

    const lightboxNext =
        document.getElementById("lightboxNext");


    let currentGalleryIndex = 0;

    const galleryImages = [];


    /* Collect gallery images */

    galleryItems.forEach(function (item, index) {

        const image = item.querySelector("img");

        if (!image) return;

        galleryImages.push(image.src);

        item.addEventListener("click", function () {

            currentGalleryIndex = index;

            openLightbox(currentGalleryIndex);

        });

    });


    function openLightbox(index) {

        if (!lightbox || !lightboxImage) return;

        if (!galleryImages[index]) return;

        lightboxImage.src = galleryImages[index];

        lightbox.classList.add("active");

        document.body.classList.add("no-scroll");

    }


    function closeLightbox() {

        if (!lightbox) return;

        lightbox.classList.remove("active");

        document.body.classList.remove("no-scroll");

    }


    function showPreviousImage() {

        if (galleryImages.length === 0) return;

        currentGalleryIndex--;

        if (currentGalleryIndex < 0) {
            currentGalleryIndex =
                galleryImages.length - 1;
        }

        openLightbox(currentGalleryIndex);

    }


    function showNextImage() {

        if (galleryImages.length === 0) return;

        currentGalleryIndex++;

        if (currentGalleryIndex >= galleryImages.length) {
            currentGalleryIndex = 0;
        }

        openLightbox(currentGalleryIndex);

    }


    if (lightboxClose) {
        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );
    }


    if (lightboxPrev) {
        lightboxPrev.addEventListener(
            "click",
            showPreviousImage
        );
    }


    if (lightboxNext) {
        lightboxNext.addEventListener(
            "click",
            showNextImage
        );
    }


    /* Close when clicking outside image */

    if (lightbox) {

        lightbox.addEventListener("click", function (event) {

            if (event.target === lightbox) {
                closeLightbox();
            }

        });

    }


    /* =====================================================
       KEYBOARD CONTROLS FOR LIGHTBOX
    ===================================================== */

    document.addEventListener("keydown", function (event) {

        if (!lightbox ||
            !lightbox.classList.contains("active")) {
            return;
        }

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowLeft") {
            showPreviousImage();
        }

        if (event.key === "ArrowRight") {
            showNextImage();
        }

    });


    /* =====================================================
       COUNTER ANIMATION
    ===================================================== */

    const counters =
        document.querySelectorAll(".counter");

    let countersStarted = false;


    function animateCounters() {

        if (countersStarted) return;

        const statsSection =
            document.querySelector(".stats-section");

        if (!statsSection) return;


        const rect =
            statsSection.getBoundingClientRect();

        const windowHeight =
            window.innerHeight ||
            document.documentElement.clientHeight;


        if (rect.top < windowHeight * 0.85) {

            countersStarted = true;


            counters.forEach(function (counter) {

                const target =
                    parseInt(
                        counter.getAttribute("data-target"),
                        10
                    );

                if (isNaN(target)) return;

                let current = 0;

                const duration = 1400;

                const startTime = performance.now();


                function updateCounter(currentTime) {

                    const elapsed =
                        currentTime - startTime;

                    const progress =
                        Math.min(
                            elapsed / duration,
                            1
                        );


                    /* Smooth easing */

                    const eased =
                        1 - Math.pow(1 - progress, 3);


                    current =
                        Math.floor(target * eased);

                    counter.textContent = current;


                    if (progress < 1) {

                        requestAnimationFrame(
                            updateCounter
                        );

                    } else {

                        counter.textContent = target;

                    }

                }


                requestAnimationFrame(updateCounter);

            });

        }

    }


    window.addEventListener(
        "scroll",
        animateCounters
    );

    animateCounters();


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backToTop =
        document.getElementById("backToTop");


    function handleBackToTop() {

        if (!backToTop) return;

        if (window.scrollY > 500) {

            backToTop.classList.add("active");

        } else {

            backToTop.classList.remove("active");

        }

    }


    window.addEventListener(
        "scroll",
        handleBackToTop
    );

    handleBackToTop();


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            function () {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    link.getAttribute("href");

                if (!targetId ||
                    targetId === "#") {
                    return;
                }


                const target =
                    document.querySelector(targetId);

                if (!target) return;


                event.preventDefault();


                const headerHeight =
                    siteHeader
                        ? siteHeader.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.pageYOffset -
                    headerHeight;


                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

            }
        );

    });


    /* =====================================================
       IMAGE ERROR HANDLING
       
       Prevent broken images from showing ugly
       browser broken-image icons.
    ===================================================== */

    const allImages =
        document.querySelectorAll("img");


    allImages.forEach(function (image) {

        image.addEventListener(
            "error",
            function () {

                console.warn(
                    "Image could not be loaded:",
                    image.getAttribute("src")
                );

                image.style.display = "none";

            }
        );

    });


    /* =====================================================
       VIDEO CONTROLS
       
       14.mp4 and 15.mp4 are NORMAL VIDEOS.
       No autoplay.
       No background video.
       No automatic playback.
    ===================================================== */

    const videos =
        document.querySelectorAll("video");


    videos.forEach(function (video) {

        video.removeAttribute("autoplay");

        video.removeAttribute("muted");

        video.setAttribute("controls", "");

        video.setAttribute("preload", "metadata");


        /* Pause other video when one starts */

        video.addEventListener(
            "play",
            function () {

                videos.forEach(function (otherVideo) {

                    if (otherVideo !== video) {
                        otherVideo.pause();
                    }

                });

            }
        );

    });


    /* =====================================================
       PREVENT HORIZONTAL OVERFLOW FROM DYNAMIC CONTENT
    ===================================================== */

    window.addEventListener(
        "resize",
        function () {

            /* Recalculate open FAQ */

            faqItems.forEach(function (item) {

                if (!item.classList.contains("active")) {
                    return;
                }

                const answer =
                    item.querySelector(".faq-answer");

                if (answer) {
                    answer.style.maxHeight =
                        answer.scrollHeight + "px";
                }

            });

        }
    );


    /* =====================================================
       PAGE READY
    ===================================================== */

    document.body.classList.add("page-ready");

});/* =========================================================
   SINHASSAN 104
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       PRELOADER
    ===================================================== */

    const preloader = document.getElementById("preloader");

    if (preloader) {
        window.addEventListener("load", function () {
            setTimeout(function () {
                preloader.classList.add("hide");

                setTimeout(function () {
                    preloader.style.display = "none";
                }, 850);

            }, 700);
        });

        /* Fallback in case window load is delayed */
        setTimeout(function () {
            preloader.classList.add("hide");

            setTimeout(function () {
                preloader.style.display = "none";
            }, 850);

        }, 3000);
    }


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    const siteHeader = document.getElementById("siteHeader");

    function handleHeaderScroll() {

        if (!siteHeader) return;

        if (window.scrollY > 40) {
            siteHeader.classList.add("scrolled");
        } else {
            siteHeader.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleHeaderScroll);

    handleHeaderScroll();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const mobileNav = document.getElementById("mobileNav");

    if (menuToggle && mobileNav) {

        menuToggle.addEventListener("click", function () {

            mobileNav.classList.toggle("active");

            document.body.classList.toggle("no-scroll");

        });


        /* Close menu after clicking a link */

        const mobileLinks = mobileNav.querySelectorAll("a");

        mobileLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                mobileNav.classList.remove("active");

                document.body.classList.remove("no-scroll");

            });

        });

    }


    /* =====================================================
       FAQ ACCORDION
    ===================================================== */

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(function (item) {

        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        if (!question || !answer) return;

        question.addEventListener("click", function () {

            const isActive = item.classList.contains("active");


            /* Close all other FAQ items */

            faqItems.forEach(function (otherItem) {

                if (otherItem !== item) {

                    otherItem.classList.remove("active");

                    const otherAnswer =
                        otherItem.querySelector(".faq-answer");

                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = null;
                    }
                }

            });


            /* Open clicked item */

            if (!isActive) {

                item.classList.add("active");

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

            } else {

                item.classList.remove("active");

                answer.style.maxHeight = null;

            }

        });

    });


    /* =====================================================
       GALLERY LIGHTBOX
       
       Uses 3.jpg - 11.jpg
       ===================================================== */

    const galleryItems =
        document.querySelectorAll(".gallery-item");

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxClose =
        document.getElementById("lightboxClose");

    const lightboxPrev =
        document.getElementById("lightboxPrev");

    const lightboxNext =
        document.getElementById("lightboxNext");


    let currentGalleryIndex = 0;

    const galleryImages = [];


    /* Collect gallery images */

    galleryItems.forEach(function (item, index) {

        const image = item.querySelector("img");

        if (!image) return;

        galleryImages.push(image.src);

        item.addEventListener("click", function () {

            currentGalleryIndex = index;

            openLightbox(currentGalleryIndex);

        });

    });


    function openLightbox(index) {

        if (!lightbox || !lightboxImage) return;

        if (!galleryImages[index]) return;

        lightboxImage.src = galleryImages[index];

        lightbox.classList.add("active");

        document.body.classList.add("no-scroll");

    }


    function closeLightbox() {

        if (!lightbox) return;

        lightbox.classList.remove("active");

        document.body.classList.remove("no-scroll");

    }


    function showPreviousImage() {

        if (galleryImages.length === 0) return;

        currentGalleryIndex--;

        if (currentGalleryIndex < 0) {
            currentGalleryIndex =
                galleryImages.length - 1;
        }

        openLightbox(currentGalleryIndex);

    }


    function showNextImage() {

        if (galleryImages.length === 0) return;

        currentGalleryIndex++;

        if (currentGalleryIndex >= galleryImages.length) {
            currentGalleryIndex = 0;
        }

        openLightbox(currentGalleryIndex);

    }


    if (lightboxClose) {
        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );
    }


    if (lightboxPrev) {
        lightboxPrev.addEventListener(
            "click",
            showPreviousImage
        );
    }


    if (lightboxNext) {
        lightboxNext.addEventListener(
            "click",
            showNextImage
        );
    }


    /* Close when clicking outside image */

    if (lightbox) {

        lightbox.addEventListener("click", function (event) {

            if (event.target === lightbox) {
                closeLightbox();
            }

        });

    }


    /* =====================================================
       KEYBOARD CONTROLS FOR LIGHTBOX
    ===================================================== */

    document.addEventListener("keydown", function (event) {

        if (!lightbox ||
            !lightbox.classList.contains("active")) {
            return;
        }

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowLeft") {
            showPreviousImage();
        }

        if (event.key === "ArrowRight") {
            showNextImage();
        }

    });


    /* =====================================================
       COUNTER ANIMATION
    ===================================================== */

    const counters =
        document.querySelectorAll(".counter");

    let countersStarted = false;


    function animateCounters() {

        if (countersStarted) return;

        const statsSection =
            document.querySelector(".stats-section");

        if (!statsSection) return;


        const rect =
            statsSection.getBoundingClientRect();

        const windowHeight =
            window.innerHeight ||
            document.documentElement.clientHeight;


        if (rect.top < windowHeight * 0.85) {

            countersStarted = true;


            counters.forEach(function (counter) {

                const target =
                    parseInt(
                        counter.getAttribute("data-target"),
                        10
                    );

                if (isNaN(target)) return;

                let current = 0;

                const duration = 1400;

                const startTime = performance.now();


                function updateCounter(currentTime) {

                    const elapsed =
                        currentTime - startTime;

                    const progress =
                        Math.min(
                            elapsed / duration,
                            1
                        );


                    /* Smooth easing */

                    const eased =
                        1 - Math.pow(1 - progress, 3);


                    current =
                        Math.floor(target * eased);

                    counter.textContent = current;


                    if (progress < 1) {

                        requestAnimationFrame(
                            updateCounter
                        );

                    } else {

                        counter.textContent = target;

                    }

                }


                requestAnimationFrame(updateCounter);

            });

        }

    }


    window.addEventListener(
        "scroll",
        animateCounters
    );

    animateCounters();


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backToTop =
        document.getElementById("backToTop");


    function handleBackToTop() {

        if (!backToTop) return;

        if (window.scrollY > 500) {

            backToTop.classList.add("active");

        } else {

            backToTop.classList.remove("active");

        }

    }


    window.addEventListener(
        "scroll",
        handleBackToTop
    );

    handleBackToTop();


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            function () {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    link.getAttribute("href");

                if (!targetId ||
                    targetId === "#") {
                    return;
                }


                const target =
                    document.querySelector(targetId);

                if (!target) return;


                event.preventDefault();


                const headerHeight =
                    siteHeader
                        ? siteHeader.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.pageYOffset -
                    headerHeight;


                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

            }
        );

    });


    /* =====================================================
       IMAGE ERROR HANDLING
       
       Prevent broken images from showing ugly
       browser broken-image icons.
    ===================================================== */

    const allImages =
        document.querySelectorAll("img");


    allImages.forEach(function (image) {

        image.addEventListener(
            "error",
            function () {

                console.warn(
                    "Image could not be loaded:",
                    image.getAttribute("src")
                );

                image.style.display = "none";

            }
        );

    });


    /* =====================================================
       VIDEO CONTROLS
       
       14.mp4 and 15.mp4 are NORMAL VIDEOS.
       No autoplay.
       No background video.
       No automatic playback.
    ===================================================== */

    const videos =
        document.querySelectorAll("video");


    videos.forEach(function (video) {

        video.removeAttribute("autoplay");

        video.removeAttribute("muted");

        video.setAttribute("controls", "");

        video.setAttribute("preload", "metadata");


        /* Pause other video when one starts */

        video.addEventListener(
            "play",
            function () {

                videos.forEach(function (otherVideo) {

                    if (otherVideo !== video) {
                        otherVideo.pause();
                    }

                });

            }
        );

    });


    /* =====================================================
       PREVENT HORIZONTAL OVERFLOW FROM DYNAMIC CONTENT
    ===================================================== */

    window.addEventListener(
        "resize",
        function () {

            /* Recalculate open FAQ */

            faqItems.forEach(function (item) {

                if (!item.classList.contains("active")) {
                    return;
                }

                const answer =
                    item.querySelector(".faq-answer");

                if (answer) {
                    answer.style.maxHeight =
                        answer.scrollHeight + "px";
                }

            });

        }
    );


    /* =====================================================
       PAGE READY
    ===================================================== */

    document.body.classList.add("page-ready");

});