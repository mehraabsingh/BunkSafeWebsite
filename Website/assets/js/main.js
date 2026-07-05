/**
 * ==========================================================================
 * BunkSafe Interactive Logic - Official Marketing & Support Website
 * Vanilla JavaScript (ES6+) - Zero External Dependencies
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initFaqAccordion();
  initCarousel();
  initIntersectionObserver();
  initSmoothScroll();
  initActiveNav();
});

/**
 * 1. Responsive Mobile Hamburger Navigation
 */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-link');

  if (!hamburger || !navLinks) return;

  const toggleMenu = (open) => {
    const isOpen = open !== undefined ? open : !navLinks.classList.contains('open');
    navLinks.classList.toggle('open', isOpen);
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      document.body.style.overflow = '';
    }
  };

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close menu when clicking a navigation link
  links.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Close menu when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      toggleMenu(false);
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      toggleMenu(false);
    }
  });
}

/**
 * 2. Interactive FAQ Accordion with WAI-ARIA Support
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answerDiv = item.querySelector('.faq-answer');

    if (!questionBtn || !answerDiv) return;

    questionBtn.addEventListener('click', () => {
      const isExpanded = item.classList.contains('active');

      // Optional: Close other open FAQs for a clean Apple HIG feel
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          const otherBtn = otherItem.querySelector('.faq-question');
          const otherAns = otherItem.querySelector('.faq-answer');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherAns) otherAns.style.maxHeight = null;
        }
      });

      // Toggle current item
      item.classList.toggle('active', !isExpanded);
      questionBtn.setAttribute('aria-expanded', !isExpanded);

      if (!isExpanded) {
        answerDiv.style.maxHeight = answerDiv.scrollHeight + 'px';
      } else {
        answerDiv.style.maxHeight = null;
      }
    });

    // Keyboard support for Enter/Space
    questionBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        questionBtn.click();
      }
    });
  });
}

/**
 * 3. Screenshots Carousel with Swipe, Keyboard, and Dot Controls
 */
function initCarousel() {
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const dotsContainer = document.querySelector('.carousel-dots');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  const totalSlides = slides.length;

  // Generate dots dynamically if container exists
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('role', 'button');
      dot.setAttribute('aria-label', `Go to screenshot ${idx + 1}`);
      dot.addEventListener('click', () => goToSlide(idx));
      dotsContainer.appendChild(dot);
    });
  }

  const dots = dotsContainer ? dotsContainer.querySelectorAll('.carousel-dot') : [];

  const updateCarousel = () => {
    // Calculate scroll offset based on slide width + gap (24px)
    const slideWidth = slides[0].offsetWidth;
    const gap = 24;
    const offset = currentIndex * (slideWidth + gap);
    track.style.transform = `translate3d(-${offset}px, 0, 0)`;

    // Update active dot
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });

    // Update button states
    if (prevBtn) prevBtn.style.opacity = currentIndex === 0 ? '0.4' : '1';
    if (nextBtn) nextBtn.style.opacity = currentIndex === totalSlides - 1 ? '0.4' : '1';
  };

  const goToSlide = (index) => {
    currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
    updateCarousel();
  };

  if (prevBtn) {
    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
  }

  // Keyboard arrow navigation when inside carousel section
  const section = track.closest('.carousel-section');
  if (section) {
    section.setAttribute('tabindex', '0');
    section.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToSlide(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToSlide(currentIndex + 1);
      }
    });
  }

  // Touch Swipe Dragging Logic
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  track.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - track.offsetLeft;
    track.style.transition = 'none';
  });

  track.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].pageX - track.offsetLeft;
    track.style.transition = 'none';
  }, { passive: true });

  const handleMove = (pageX) => {
    if (!isDragging) return;
    currentX = pageX - track.offsetLeft;
    const diff = currentX - startX;
    const slideWidth = slides[0].offsetWidth + 24;
    const baseOffset = -currentIndex * slideWidth;
    track.style.transform = `translate3d(${baseOffset + diff}px, 0, 0)`;
  };

  track.addEventListener('mousemove', (e) => {
    if (isDragging) e.preventDefault();
    handleMove(e.pageX);
  });

  track.addEventListener('touchmove', (e) => {
    handleMove(e.touches[0].pageX);
  }, { passive: true });

  const handleEnd = () => {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = '';
    const diff = currentX - startX;
    if (diff < -60 && currentIndex < totalSlides - 1) {
      goToSlide(currentIndex + 1);
    } else if (diff > 60 && currentIndex > 0) {
      goToSlide(currentIndex - 1);
    } else {
      updateCarousel(); // Revert back to current
    }
  };

  track.addEventListener('mouseup', handleEnd);
  track.addEventListener('mouseleave', handleEnd);
  track.addEventListener('touchend', handleEnd);

  // Recalculate on window resize
  window.addEventListener('resize', () => updateCarousel());
  updateCarousel();
}

/**
 * 4. Scroll-Triggered Fade-In Animations (IntersectionObserver)
 */
function initIntersectionObserver() {
  const sections = document.querySelectorAll('.fade-in-section');
  if (!sections.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target); // Animate only once for performance
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.15
  });

  sections.forEach(sec => observer.observe(sec));
}

/**
 * 5. Smooth Anchor Scrolling
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 70;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * 6. Highlight Active Navigation Link Based on URL / Scroll
 */
function initActiveNav() {
  const links = document.querySelectorAll('.nav-link');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  links.forEach(link => {
    const linkPath = link.getAttribute('href').split('#')[0];
    if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
