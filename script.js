document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.querySelector('.carousel');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const carouselContent = document.querySelector('.carousel-content');

  let currentIndex = 0;
  let isAnimating = false;

  nextBtn.addEventListener('click', () => {
    if (!isAnimating) {
      currentIndex = (currentIndex + 1) % carouselContent.children.length;
      updateCarousel();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (!isAnimating) {
      currentIndex = (currentIndex - 1 + carouselContent.children.length) % carouselContent.children.length;
      updateCarousel();
    }
  });

  function updateCarousel() {
    const containerWidth = carousel.clientWidth;
    const targetScroll = currentIndex * (containerWidth / carouselContent.children.length);

    isAnimating = true;

    // Utilizar desplazamiento suave mediante scrollLeft
    smoothScrollTo(carousel, targetScroll, 800, () => {
      isAnimating = false;
      toggleButtonsVisibility();
    });
  }

  function smoothScrollTo(element, target, duration, callback) {
    const start = element.scrollLeft;
    const distance = target - start;
    const startTime = performance.now();

    function step(currentTime) {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      element.scrollLeft = start + distance * easeInOutCubic(progress);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        if (callback) {
          callback();
        }
      }
    }

    // Iniciar la animación
    requestAnimationFrame(step);
  }

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
  }

  function toggleButtonsVisibility() {
    prevBtn.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
    nextBtn.style.visibility = currentIndex === carouselContent.children.length - 1 ? 'hidden' : 'visible';
  }

  // Mostrar u ocultar los botones al cargar la página
  toggleButtonsVisibility();

  // Añadir evento de transición al finalizar
  carouselContent.addEventListener('transitionend', () => {
    if (currentIndex === carouselContent.children.length - 1) {
      // Si es la última imagen, volver a la primera
      currentIndex = 0;
      carousel.scrollLeft = 0;
      toggleButtonsVisibility();
    }
  });
});
