// cuenta de stats - números //
const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = Number(counter.dataset.target);
        const prefix = counter.dataset.prefix || "";
        const suffix = counter.dataset.suffix || "";

        let current = 0;
        // 80 frames es aproximadamente 1.3 segundos a 60fps
        const increment = target / 80; 

        const updateCounter = () => {
            current += increment;

            // Cambiamos la condición para asegurar suavidad hasta el final
            if (current < target) {
                counter.textContent =
                    prefix +
                    Math.round(current) + // Usamos round para que los números pequeños (como el 3) se actualicen bien
                    suffix;

                requestAnimationFrame(updateCounter);
            } else {
                // Aseguramos que el valor final sea exactamente el target
                counter.textContent = prefix + target + suffix;
            }
        };

        updateCounter();
        observer.unobserve(counter); // Deja de observar para que solo ocurra una vez
    });
}, {
    threshold: 0.5 // Se activa cuando el 50% de la sección es visible
});

counters.forEach(counter => observer.observe(counter));

/* =========================
   NAVBAR MOBILE
========================= */

const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {

    const icon = menuToggle.querySelector("i");

    menuToggle.addEventListener("click", () => {

        nav.classList.toggle("active");

        if (nav.classList.contains("active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
            document.body.style.overflow = "hidden";
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
            document.body.style.overflow = "";
        }

    });

    document.querySelectorAll(".nav a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("active");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

            document.body.style.overflow = "";

        });

    });

}

// videos //

const simCards = document.querySelectorAll(".sim-card");

simCards.forEach(card => {

    card.addEventListener("click", () => {

        const isActive = card.classList.contains("active");

        // reset general
        simCards.forEach(c => {
            c.classList.remove("active");
            c.classList.remove("collapsed");

            const video = c.querySelector("video");
            if(video){
                video.pause();
                video.currentTime = 0;
            }
        });

        // si ya estaba abierta → cerrar todo
        if(isActive) return;

        // abrir seleccionada
        card.classList.add("active");

        simCards.forEach(c => {
            if(c !== card){
                c.classList.add("collapsed");
            }
        });

        const video = card.querySelector("video");
        if(video){
            video.play();
        }

    });

});

// videos mobile //

document.addEventListener("DOMContentLoaded", () => {
  const isMobile = window.matchMedia("(max-width: 430px)").matches;

  if (!isMobile) return;

  const videos = document.querySelectorAll(".sim-video");

  videos.forEach((video) => {
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.autoplay = true;

    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    };

    // Intento inmediato
    tryPlay();

    // Backup: cuando entra en viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tryPlay();
        }
      });
    }, { threshold: 0.3 });

    observer.observe(video);
  });
});