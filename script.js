document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }

  // 2. Sticky Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 3. Intersection Observer for Fade-up animations
  const fadeElements = document.querySelectorAll('.fade-up');
  
  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: "-50px"
  });

  fadeElements.forEach(el => fadeObserver.observe(el));

  // 4. Counter Animation for Stats Strip
  const stats = document.querySelectorAll('.stat-number');
  let hasCounted = false;

  const countUp = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const stepTime = Math.abs(Math.floor(duration / target));
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      element.innerText = current;
      if (current >= target) {
        element.innerText = target + (element.getAttribute('data-suffix') || '');
        clearInterval(timer);
      }
    }, stepTime);
  };

  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasCounted) {
        hasCounted = true;
        stats.forEach(stat => countUp(stat));
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  const statsSection = document.querySelector('.stats-strip');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

});
