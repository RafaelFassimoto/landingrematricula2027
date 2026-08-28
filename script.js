/* =========================================================
   FADELITO — LANDING PAGE REMATRÍCULA 2027
   JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTOS GERAIS
    ====================================================== */

    const body = document.body;


    /* =====================================================
       SCROLL SUAVE PARA ÂNCORAS
    ====================================================== */

    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


/* =====================================================
   GALERIA 2026 — CARROSSEL + LIGHTBOX
====================================================== */

const gallerySlides = Array.from(
    document.querySelectorAll('.gallery-slide[data-gallery="2026"]')
);

const galleryTrack = document.querySelector(".gallery-track");

const galleryPrevButton = document.querySelector(
    ".gallery-carousel-prev"
);

const galleryNextButton = document.querySelector(
    ".gallery-carousel-next"
);

const galleryDots = document.querySelector(".gallery-dots");

const galleryModal = document.getElementById("galleryModal");

const galleryModalImage =
    document.getElementById("galleryModalImage");

const galleryModalCaption =
    document.getElementById("galleryModalCaption");

const galleryModalClose =
    document.querySelector(".gallery-modal-close");

const galleryModalPrev =
    document.querySelector(".gallery-modal-prev");

const galleryModalNext =
    document.querySelector(".gallery-modal-next");


let galleryCurrentIndex = 0;

let galleryStartX = 0;
let galleryCurrentX = 0;
let galleryIsDragging = false;


/* =====================================================
   CRIA OS DOTS
====================================================== */

function createGalleryDots() {

    if (!galleryDots) {
        return;
    }

    galleryDots.innerHTML = "";

    gallerySlides.forEach(function (slide, index) {

        const dot = document.createElement("button");

        dot.type = "button";

        dot.className = "gallery-dot";

        dot.setAttribute(
            "aria-label",
            "Ir para o evento " + (index + 1)
        );

        dot.addEventListener(
            "click",
            function () {

                galleryCurrentIndex = index;

                updateGalleryCarousel();

            }
        );

        galleryDots.appendChild(dot);

    });

}


/* =====================================================
   QUANTIDADE DE SLIDES VISÍVEIS
====================================================== */

function getVisibleSlides() {

    if (window.innerWidth <= 760) {
        return 1;
    }

    if (window.innerWidth <= 1000) {
        return 2;
    }

    return 3;

}


/* =====================================================
   MÁXIMO DE POSIÇÕES DO CARROSSEL
====================================================== */

function getMaxGalleryIndex() {

    const visibleSlides =
        getVisibleSlides();

    return Math.max(
        0,
        gallerySlides.length - visibleSlides
    );

}


/* =====================================================
   ATUALIZA O CARROSSEL
====================================================== */

function updateGalleryCarousel() {

    if (!galleryTrack || !gallerySlides.length) {
        return;
    }

    const visibleSlides =
        getVisibleSlides();

    const slideWidth =
        gallerySlides[0].getBoundingClientRect().width;

    const trackGap =
        parseFloat(
            getComputedStyle(galleryTrack).gap
        ) || 0;

    const offset =
        galleryCurrentIndex *
        (slideWidth + trackGap);

    galleryTrack.style.transform =
        "translateX(-" + offset + "px)";


    /*
       Atualiza os dots
    */

    if (galleryDots) {

        const dots =
            galleryDots.querySelectorAll(
                ".gallery-dot"
            );

        /*
           Como no desktop existem 3 imagens visíveis,
           os dots representam cada posição do carrossel.
        */

        const maxIndex =
            getMaxGalleryIndex();

        dots.forEach(function (dot, index) {

            dot.classList.toggle(
                "active",
                index === galleryCurrentIndex
            );

            /*
               Esconde dots que não representam uma posição
               possível do carrossel.
            */

            dot.style.display =
                index <= maxIndex
                    ? ""
                    : "none";

        });

    }


    /*
       Atualiza estado das setas
    */

    if (galleryPrevButton) {

        galleryPrevButton.disabled =
            galleryCurrentIndex <= 0;

    }

    if (galleryNextButton) {

        galleryNextButton.disabled =
            galleryCurrentIndex >=
            getMaxGalleryIndex();

    }

}


/* =====================================================
   PRÓXIMO SLIDE
====================================================== */

function nextGallerySlide() {

    const maxIndex =
        getMaxGalleryIndex();

    if (
        galleryCurrentIndex <
        maxIndex
    ) {

        galleryCurrentIndex++;

        updateGalleryCarousel();

    }

}


/* =====================================================
   SLIDE ANTERIOR
====================================================== */

function previousGallerySlide() {

    if (galleryCurrentIndex > 0) {

        galleryCurrentIndex--;

        updateGalleryCarousel();

    }

}


/* =====================================================
   CLIQUES NAS SETAS
====================================================== */

if (galleryNextButton) {

    galleryNextButton.addEventListener(
        "click",
        nextGallerySlide
    );

}

if (galleryPrevButton) {

    galleryPrevButton.addEventListener(
        "click",
        previousGallerySlide
    );

}


/* =====================================================
   ABRIR LIGHTBOX
====================================================== */

function openGallery(index) {

    if (
        !gallerySlides.length ||
        !galleryModal
    ) {
        return;
    }

    galleryCurrentIndex = index;

    const slide =
        gallerySlides[galleryCurrentIndex];

    const image =
        slide.querySelector("img");

    const imageLink =
        slide.querySelector(".gallery-image-link");

    const captionTitle =
        slide.querySelector(
            ".gallery-caption strong"
        );

    const captionText =
        slide.querySelector(
            ".gallery-caption span"
        );


    if (!image) {
        return;
    }


    /*
       Usa a imagem de alta resolução definida
       no href do link.
    */

    const imageUrl =
        imageLink
            ? imageLink.getAttribute("href")
            : image.src;


    galleryModalImage.style.opacity = "0";

    galleryModalImage.src =
        imageUrl;

    galleryModalImage.alt =
        image.alt || "";


    /*
       Atualiza legenda do modal
    */

    if (galleryModalCaption) {

        galleryModalCaption.innerHTML = "";

        if (captionTitle) {

            const title =
                document.createElement("strong");

            title.textContent =
                captionTitle.textContent;

            galleryModalCaption.appendChild(
                title
            );

        }

        if (captionText) {

            const text =
                document.createElement("span");

            text.textContent =
                captionText.textContent;

            galleryModalCaption.appendChild(
                text
            );

        }

    }


    galleryModal.classList.add(
        "active"
    );

    galleryModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow =
        "hidden";


    /*
       Garante que a imagem esteja visível
       depois de carregada.
    */

    galleryModalImage.onload =
        function () {

            galleryModalImage.style.opacity =
                "1";

        };

}


/* =====================================================
   CLIQUE NAS IMAGENS
====================================================== */

gallerySlides.forEach(
    function (slide, index) {

        const imageLink =
            slide.querySelector(
                ".gallery-image-link"
            );

        if (!imageLink) {
            return;
        }

        imageLink.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                openGallery(index);

            }
        );

    }
);


/* =====================================================
   ATUALIZA IMAGEM DO MODAL
====================================================== */

function updateGalleryModal() {

    const slide =
        gallerySlides[
            galleryCurrentIndex
        ];

    if (!slide) {
        return;
    }

    const image =
        slide.querySelector("img");

    const imageLink =
        slide.querySelector(".gallery-image-link");

    const captionTitle =
        slide.querySelector(
            ".gallery-caption strong"
        );

    const captionText =
        slide.querySelector(
            ".gallery-caption span"
        );


    if (!image) {
        return;
    }


    const imageUrl =
        imageLink
            ? imageLink.getAttribute("href")
            : image.src;


    galleryModalImage.style.opacity =
        "0";


    /*
       Atualiza a legenda
    */

    if (galleryModalCaption) {

        galleryModalCaption.innerHTML = "";

        if (captionTitle) {

            const title =
                document.createElement("strong");

            title.textContent =
                captionTitle.textContent;

            galleryModalCaption.appendChild(
                title
            );

        }

        if (captionText) {

            const text =
                document.createElement("span");

            text.textContent =
                captionText.textContent;

            galleryModalCaption.appendChild(
                text
            );

        }

    }


    galleryModalImage.onload =
        function () {

            galleryModalImage.style.opacity =
                "1";

        };


    galleryModalImage.src =
        imageUrl;

    galleryModalImage.alt =
        image.alt || "";

}


/* =====================================================
   NAVEGAÇÃO DO MODAL
====================================================== */

function nextGalleryModalImage() {

    galleryCurrentIndex++;

    if (
        galleryCurrentIndex >=
        gallerySlides.length
    ) {

        galleryCurrentIndex = 0;

    }

    updateGalleryModal();

}


function previousGalleryModalImage() {

    galleryCurrentIndex--;

    if (
        galleryCurrentIndex < 0
    ) {

        galleryCurrentIndex =
            gallerySlides.length - 1;

    }

    updateGalleryModal();

}


if (galleryModalNext) {

    galleryModalNext.addEventListener(
        "click",
        nextGalleryModalImage
    );

}


if (galleryModalPrev) {

    galleryModalPrev.addEventListener(
        "click",
        previousGalleryModalImage
    );

}


/* =====================================================
   FECHAR LIGHTBOX
====================================================== */

function closeGallery() {

    if (!galleryModal) {
        return;
    }

    galleryModal.classList.remove(
        "active"
    );

    galleryModal.setAttribute(
        "aria-hidden",
        "true"
    );

    galleryModalImage.src = "";

    if (galleryModalCaption) {
        galleryModalCaption.innerHTML = "";
    }

    document.body.style.overflow = "";

}


if (galleryModalClose) {

    galleryModalClose.addEventListener(
        "click",
        closeGallery
    );

}


/*
   Clique no fundo fecha o modal
*/

if (galleryModal) {

    galleryModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                galleryModal
            ) {

                closeGallery();

            }

        }
    );

}


/* =====================================================
   SWIPE DO CARROSSEL
====================================================== */

if (galleryTrack) {

    galleryTrack.addEventListener(
        "touchstart",
        function (event) {

            galleryStartX =
                event.touches[0].clientX;

            galleryCurrentX =
                galleryStartX;

            galleryIsDragging = true;

            galleryTrack.style.transition =
                "none";

        },
        {
            passive: true
        }
    );


    galleryTrack.addEventListener(
        "touchmove",
        function (event) {

            if (!galleryIsDragging) {
                return;
            }

            galleryCurrentX =
                event.touches[0].clientX;

        },
        {
            passive: true
        }
    );


    galleryTrack.addEventListener(
        "touchend",
        function () {

            if (!galleryIsDragging) {
                return;
            }

            galleryIsDragging = false;

            galleryTrack.style.transition =
                "";

            const distance =
                galleryCurrentX -
                galleryStartX;


            if (Math.abs(distance) < 50) {

                updateGalleryCarousel();

                return;

            }


            if (distance < 0) {

                nextGallerySlide();

            } else {

                previousGallerySlide();

            }

        }
    );

}


/* =====================================================
   TECLADO
====================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        /*
           Se o modal estiver aberto
        */

        if (
            galleryModal &&
            galleryModal.classList.contains(
                "active"
            )
        ) {

            if (
                event.key ===
                "ArrowRight"
            ) {

                nextGalleryModalImage();

            }

            if (
                event.key ===
                "ArrowLeft"
            ) {

                previousGalleryModalImage();

            }

            if (
                event.key ===
                "Escape"
            ) {

                closeGallery();

            }

            return;

        }


        /*
           Teclas do carrossel
        */

        if (
            event.key ===
            "ArrowRight"
        ) {

            nextGallerySlide();

        }

        if (
            event.key ===
            "ArrowLeft"
        ) {

            previousGallerySlide();

        }

    }
);


/* =====================================================
   REDIMENSIONAMENTO DA TELA
====================================================== */

window.addEventListener(
    "resize",
    function () {

        /*
           Evita que o carrossel fique em uma posição
           incorreta quando muda de desktop para mobile.
        */

        const maxIndex =
            getMaxGalleryIndex();

        if (
            galleryCurrentIndex >
            maxIndex
        ) {

            galleryCurrentIndex =
                maxIndex;

        }

        updateGalleryCarousel();

    }
);


/* =====================================================
   INICIALIZAÇÃO
====================================================== */

createGalleryDots();

updateGalleryCarousel();




    /* =====================================================
       VÍDEO
    ====================================================== */

    const videoPlay =
        document.querySelector(".video-play");

    const videoModal =
        document.getElementById("videoModal");

    const videoIframe =
        document.getElementById("videoIframe");

    const videoClose =
        document.querySelector(".video-modal-close");


    /*
       Converte URLs comuns de YouTube e Vimeo
       para URLs de embed.
    */

    function convertVideoUrl(url) {

        if (!url) {
            return "";
        }

        /*
           YouTube
        */

        if (
            url.includes("youtube.com/watch") ||
            url.includes("youtu.be/")
        ) {

            let videoId = "";

            if (url.includes("youtu.be/")) {

                videoId =
                    url.split("youtu.be/")[1].split("?")[0];

            } else {

                const urlObject = new URL(url);

                videoId =
                    urlObject.searchParams.get("v");

            }

            if (videoId) {

                return (
                    "https://www.youtube.com/embed/" +
                    videoId +
                    "?autoplay=1&rel=0"
                );

            }

        }


        /*
           Vimeo
        */

        if (url.includes("vimeo.com/")) {

            const parts = url.split("vimeo.com/");

            const videoId =
                parts[1].split("?")[0].split("/")[0];

            if (videoId) {

                return (
                    "https://player.vimeo.com/video/" +
                    videoId +
                    "?autoplay=1"
                );

            }

        }


        /*
           Caso já seja uma URL de embed
        */

        if (
            url.includes("youtube.com/embed/") ||
            url.includes("player.vimeo.com/video/")
        ) {

            if (url.includes("?")) {
                return url + "&autoplay=1";
            }

            return url + "?autoplay=1";

        }


        return url;

    }


    /*
       Abre o vídeo
    */

    function openVideo() {

        if (!videoModal || !videoIframe || !videoPlay) {
            return;
        }

        const videoUrl =
            videoPlay.getAttribute("data-video");

        if (!videoUrl) {
            console.warn(
                "Nenhum vídeo foi definido em data-video."
            );

            return;
        }

        const embedUrl =
            convertVideoUrl(videoUrl);

        videoIframe.src = embedUrl;

        videoModal.classList.add("active");

        videoModal.setAttribute(
            "aria-hidden",
            "false"
        );

        body.style.overflow = "hidden";

    }


    /*
       Fecha o vídeo
    */

    function closeVideo() {

        if (!videoModal || !videoIframe) {
            return;
        }

        videoModal.classList.remove("active");

        videoModal.setAttribute(
            "aria-hidden",
            "true"
        );

        /*
           Remover o src interrompe completamente
           a reprodução do vídeo.
        */

        setTimeout(function () {

            if (!videoModal.classList.contains("active")) {
                videoIframe.src = "";
            }

        }, 300);

        restoreBodyScroll();

    }


    /*
       Clique no botão de play
    */

    if (videoPlay) {

        videoPlay.addEventListener(
            "click",
            openVideo
        );

    }


    /*
       Fechar vídeo
    */

    if (videoClose) {

        videoClose.addEventListener(
            "click",
            closeVideo
        );

    }


    /*
       Clicar fora do vídeo fecha o modal
    */

    if (videoModal) {

        videoModal.addEventListener(
            "click",
            function (event) {

                if (event.target === videoModal) {
                    closeVideo();
                }

            }
        );

    }


    /* =====================================================
       TECLADO
    ====================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            /*
               ESC
            */

            if (event.key === "Escape") {

                if (
                    galleryModal &&
                    galleryModal.classList.contains("active")
                ) {

                    closeGallery();

                }

                if (
                    videoModal &&
                    videoModal.classList.contains("active")
                ) {

                    closeVideo();

                }

            }


            /*
               Setas da galeria
            */

            if (
                galleryModal &&
                galleryModal.classList.contains("active")
            ) {

                if (event.key === "ArrowRight") {
                    nextGalleryImage();
                }

                if (event.key === "ArrowLeft") {
                    previousGalleryImage();
                }

            }

        }
    );


    /* =====================================================
       SWIPE NO CELULAR
    ====================================================== */

    let touchStartX = 0;
    let touchEndX = 0;


    if (galleryModal) {

        galleryModal.addEventListener(
            "touchstart",
            function (event) {

                touchStartX =
                    event.changedTouches[0].screenX;

            },
            {
                passive: true
            }
        );


        galleryModal.addEventListener(
            "touchend",
            function (event) {

                touchEndX =
                    event.changedTouches[0].screenX;

                handleGallerySwipe();

            },
            {
                passive: true
            }
        );

    }


    function handleGallerySwipe() {

        const minimumSwipeDistance = 50;

        const distance =
            touchEndX - touchStartX;

        if (
            Math.abs(distance) <
            minimumSwipeDistance
        ) {
            return;
        }

        if (distance < 0) {

            nextGalleryImage();

        } else {

            previousGalleryImage();

        }

    }


    /* =====================================================
       RESTAURAR SCROLL DO BODY
    ====================================================== */

    function restoreBodyScroll() {

        /*
           Só libera o scroll quando nenhum modal estiver aberto.
        */

        const galleryOpen =
            galleryModal &&
            galleryModal.classList.contains("active");

        const videoOpen =
            videoModal &&
            videoModal.classList.contains("active");

        if (!galleryOpen && !videoOpen) {

            body.style.overflow = "";

        }

    }


    /* =====================================================
       LAZY LOAD DAS IMAGENS
    ====================================================== */

    const allImages =
        document.querySelectorAll("img");

    allImages.forEach(function (image) {

        /*
           Mantém a imagem do Hero carregando imediatamente.
           As demais podem utilizar lazy loading.
        */

        if (!image.closest(".hero-image")) {

            image.setAttribute(
                "loading",
                "lazy"
            );

        }

    });


    /* =====================================================
       ANIMAÇÃO AO ENTRAR NA TELA
    ====================================================== */

    const animatedElements = document.querySelectorAll(
        ".section-heading, " +
        ".why-text, " +
        ".video-wrapper, " +
        ".gallery-heading, " +
        ".gallery-item, " +
        ".cambridge-content, " +
        ".cambridge-image-wrapper, " +
        ".pricing-card, " +
        ".ebook-image, " +
        ".ebook-content"
    );


    /*
       Verifica se o navegador suporta IntersectionObserver.
    */

    if ("IntersectionObserver" in window) {

        const animationObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "is-visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -40px 0px"
                }
            );


        animatedElements.forEach(
            function (element) {

                element.classList.add(
                    "scroll-animation"
                );

                animationObserver.observe(
                    element
                );

            }
        );

    }


    /* =====================================================
       CSS DINÂMICO DAS ANIMAÇÕES DE SCROLL
    ====================================================== */

    const scrollAnimationStyle =
        document.createElement("style");

    scrollAnimationStyle.textContent = `

        .scroll-animation {
            opacity: 0;
            transform: translateY(25px);
            transition:
                opacity 0.7s ease,
                transform 0.7s ease;
        }

        .scroll-animation.is-visible {
            opacity: 1;
            transform: translateY(0);
        }

        .gallery-item:nth-child(2) {
            transition-delay: 0.05s;
        }

        .gallery-item:nth-child(3) {
            transition-delay: 0.1s;
        }

        .gallery-item:nth-child(4) {
            transition-delay: 0.15s;
        }

        .gallery-item:nth-child(5) {
            transition-delay: 0.2s;
        }

        .gallery-item:nth-child(6) {
            transition-delay: 0.25s;
        }

        .gallery-item:nth-child(7) {
            transition-delay: 0.3s;
        }

        #galleryModalImage {
            transition: opacity 0.15s ease;
        }

    `;

    document.head.appendChild(
        scrollAnimationStyle
    );


    /* =====================================================
       LOG
    ====================================================== */

    console.log(
        "Fadelito — Landing Page Rematrícula 2027 carregada."
    );

});

