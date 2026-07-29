const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
});

document.querySelectorAll('#mobileMenu a').forEach(link => {
  link.addEventListener('click', () => { mobileMenu.style.display = 'none'; });
});

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 40 ? '0 4px 24px rgba(14,165,233,0.08)' : 'none';
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const counters = document.querySelectorAll('.counter');

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1600;
  const startTime = performance.now();
  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

const waFab = document.getElementById('wa-fab');
const waCard = document.getElementById('wa-card');
const waClose = document.getElementById('wa-close');
let waOpen = false;

function toggleWA() {
  waOpen = !waOpen;
  waCard.classList.toggle('open', waOpen);
}

waFab.addEventListener('click', toggleWA);
waClose.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleWA();
});

setTimeout(() => {
  waOpen = true;
  waCard.classList.add('open');
  setTimeout(() => {
    waOpen = false;
    waCard.classList.remove('open');
  }, 4000);
}, 1000);

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector('.btn-submit');
  const inputs = contactForm.querySelectorAll('input, select, textarea');

  const data = {
    fullName:    inputs[0].value,
    companyName: inputs[1].value,
    email:       inputs[2].value,
    phone:       inputs[3].value,
    service:     inputs[4].value,
    message:     inputs[5].value
  };

  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    const response = await fetch('http://localhost:8080/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      btn.textContent = '✅ Message Sent!';
      
      contactForm.reset();
    } else {
      btn.textContent = '❌ Failed. Try again.';
    }
  } catch (err) {
    btn.textContent = '❌ Server not reachable.';
  }

  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.disabled = false;
  }, 3000);
});