/* =========================================================
   SINHASSAN 104 — MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PRELOADER
    ===================================================== */

    const preloader = document.getElementById("preloader");

    if (preloader) {
        setTimeout(() => {
            preloader.classList.add("hide");

            setTimeout(() => {
                preloader.style.display = "none";
            }, 800);

        }, 800);
    }


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    const header = document.getElementById("siteHeader");

    window.addEventListener("scroll", () => {

        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    });


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const mobileNav = document.getElementById("mobileNav");

    if (mobileMenuBtn && mobileNav) {

        mobileMenuBtn.addEventListener("click", () => {

            mobileMenuBtn.classList.toggle("active");
            mobileNav.classList.toggle("active");

        });


        const mobileLinks = mobileNav.querySelectorAll("a");

        mobileLinks.forEach(link => {

            link.addEventListener("click", () => {

                mobileMenuBtn.classList.remove("active");
                mobileNav.classList.remove("active");

            });

        });

    }


    /* =====================================================
       FAQ ACCORDION
    ===================================================== */

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const question = item.querySelector(".faq-question");

        if (!question) return;

        question.addEventListener("click", () => {

            const isActive = item.classList.contains("active");


            /* Close all other FAQ items */

            faqItems.forEach(otherItem => {
                otherItem.classList.remove("active");
            });


            /* Open clicked item */

            if (!isActive) {
                item.classList.add("active");
            }

        });

    });


    /* =====================================================
       GALLERY LIGHTBOX
    ===================================================== */

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxClose = document.getElementById("lightboxClose");

    const galleryButtons = document.querySelectorAll(".gallery-view");

    galleryButtons.forEach(button => {

        button.addEventListener("click", () => {

            const image = button.getAttribute("data-image");

            if (!image || !lightbox || !lightboxImage) return;

            lightboxImage.src = image;
            lightbox.classList.add("active");

            document.body.classList.add("lightbox-open");

        });

    });


    function closeLightbox() {

        if (!lightbox) return;

        lightbox.classList.remove("active");
        document.body.classList.remove("lightbox-open");

    }


    if (lightboxClose) {
        lightboxClose.addEventListener("click", closeLightbox);
    }


    if (lightbox) {

        lightbox.addEventListener("click", event => {

            if (event.target === lightbox) {
                closeLightbox();
            }

        });

    }


    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeLightbox();
        }

    });


    /* =====================================================
       COUNTER ANIMATION
    ===================================================== */

    const counters = document.querySelectorAll(".counter");

    const counterObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const counter = entry.target;
                const target = Number(counter.dataset.target);

                let current = 0;

                const duration = 1500;
                const increment = target / (duration / 16);

                const updateCounter = () => {

                    current += increment;

                    if (current < target) {

                        counter.textContent = Math.floor(current);

                        requestAnimationFrame(updateCounter);

                    } else {

                        counter.textContent = target;

                    }

                };

                updateCounter();

                counterObserver.unobserve(counter);

            });

        },
        {
            threshold: 0.5
        }
    );


    counters.forEach(counter => {
        counterObserver.observe(counter);
    });


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backToTop = document.getElementById("backToTop");

    if (backToTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }

        });


        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


});