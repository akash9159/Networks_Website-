// ============================================
//  NETWORKS Website — script.js
//  Corporate & Serious | Apple Mesh Gradient
// ============================================


// ── 1. NAVBAR — Hamburger ──────────────────
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.style.display === 'block';
  mobileMenu.style.display = isOpen ? 'none' : 'block';
});

document.querySelectorAll('#mobileMenu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.style.display = 'none';
  });
});


// ── 2. NAVBAR — Solid on scroll ────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.style.background = 'rgba(10, 22, 40, 0.98)';
  } else {
    navbar.style.background = 'rgba(10, 22, 40, 0.92)';
  }
});


// ── 3. SCROLL REVEAL ───────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger cards in a grid slightly
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
    }
  });
}, { threshold: 0.10 });

// Add stagger delay to grid children
document.querySelectorAll(
  '.svc-card, .exp-card, .why-card, .about-card, .metric-box'
).forEach((el, i) => {
  el.dataset.delay = (i % 3) * 80; // stagger every row
  el.classList.add('reveal');
});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


// ── 4. WHATSAPP POPUP ──────────────────────
const waFab   = document.getElementById('wa-fab');
const waCard  = document.getElementById('wa-card');
const waClose = document.getElementById('wa-close');
let   waOpen  = false;

function toggleWA() {
  waOpen = !waOpen;
  waCard.classList.toggle('open', waOpen);
}

waFab.addEventListener('click', toggleWA);
waClose.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleWA();
});

// Auto-open after 6 seconds
setTimeout(() => { if (!waOpen) toggleWA(); }, 6000);


// ── 5. CONTACT FORM ────────────────────────
document.addEventListener("DOMContentLoaded", () => {

    const contactForm = document.getElementById("contactForm");

    contactForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const btn = contactForm.querySelector(".btn-submit");

        btn.disabled = true;
        btn.innerHTML = "Sending...";

        const formData = {

            name: document.getElementById("name").value,
            company: document.getElementById("company").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            service: document.getElementById("service").value,
            message: document.getElementById("message").value

        };

        try {

            const response = await fetch("http://127.0.0.1:5000/api/contact", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(formData)

            });

            const result = await response.json();

            btn.innerHTML = "✅ Message Sent!";
            btn.style.background = "#16A34A";

            alert(result.message);

            contactForm.reset();

        } catch (error) {

            console.error(error);

            btn.innerHTML = "Send Message";
            btn.disabled = false;

            alert("Unable to connect to Flask.");

        }

    });

});


// ── 6. APPLE-STYLE ANIMATED MESH GRADIENT ──
// This creates smooth, slow-moving color blobs
// that blend together — exactly like Apple's hero

const canvas = document.getElementById('meshCanvas');
const ctx    = canvas.getContext('2d');

let W, H;

function resize() {
  W = canvas.width  = canvas.offsetWidth;
  H = canvas.height = canvas.offsetHeight;
}
resize();
window.addEventListener('resize', resize);

// Each "orb" is a glowing color blob
const orbs = [
  { x: 0.20, y: 0.30, r: 0.55, color: '#1648A0', speed: 0.00015, angle: 0.00 },
  { x: 0.75, y: 0.60, r: 0.50, color: '#2D8EE8', speed: 0.00012, angle: 1.00 },
  { x: 0.50, y: 0.80, r: 0.45, color: '#0A3070', speed: 0.00018, angle: 2.10 },
  { x: 0.85, y: 0.20, r: 0.40, color: '#1E5FCC', speed: 0.00010, angle: 3.50 },
  { x: 0.10, y: 0.70, r: 0.38, color: '#0D4F9E', speed: 0.00014, angle: 4.80 },
  { x: 0.60, y: 0.15, r: 0.35, color: '#E8A820', speed: 0.00008, angle: 0.70 },
];

// Movement radius — how far each orb drifts from its center
const DRIFT = 0.18;

let time = 0;

function drawMesh() {
  // Dark navy base
  ctx.fillStyle = '#0A1628';
  ctx.fillRect(0, 0, W, H);

  // Draw each orb as a soft radial gradient
  orbs.forEach(orb => {
    // Slowly move the orb in a gentle circle
    const x = (orb.x + Math.sin(orb.angle + time * orb.speed * 1000) * DRIFT) * W;
    const y = (orb.y + Math.cos(orb.angle + time * orb.speed * 800) * DRIFT) * H;
    const r = orb.r * Math.max(W, H);

    const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
    gradient.addColorStop(0,   hexToRgba(orb.color, 0.28));
    gradient.addColorStop(0.5, hexToRgba(orb.color, 0.10));
    gradient.addColorStop(1,   hexToRgba(orb.color, 0.00));

    ctx.globalCompositeOperation = 'screen';
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, W, H);
  });

  // Reset blend mode
  ctx.globalCompositeOperation = 'source-over';

  time++;
  requestAnimationFrame(drawMesh);
}

// Helper: convert hex color to rgba string
function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1,3), 16);
  const g = parseInt(hex.slice(3,5), 16);
  const b = parseInt(hex.slice(5,7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

drawMesh();