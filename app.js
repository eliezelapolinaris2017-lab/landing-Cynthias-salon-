// Cynthia’s Salon — Landing Slider (GitHub Pages)
// Pagos: placeholders para que tú pegues Stripe, ATH, etc.

const PAY_LINKS = {
  stripe: "https://REEMPLAZA-ESTO-CON-TU-STRIPE-LINK",
  ath: "https://REEMPLAZA-ESTO-CON-TU-ATH-LINK",
  paypal: "https://REEMPLAZA-ESTO-CON-TU-PAYPAL-LINK",
  cashapp: "https://REEMPLAZA-ESTO-CON-TU-CASHAPP-LINK"
};

const BUSINESS = {
  name: "Cynthia’s Salon",
  address: "Trujillo Alto, 00976",
  hours: "Abierto · Cierra a las 5:00 p.m.",
  phonePretty: "(787) 590-3188",
  phone: "787-590-3188",
  whatsapp: "7875903188", // solo números
  instagram: "https://instagram.com/cynthiassalon", // cámbialo si tienes el exacto
  maps: "https://www.google.com/maps/search/?api=1&query=Trujillo%20Alto%2000976",
  tagline:
    "Un lugar donde el propósito principal es brindarte siempre el mejor servicio, " +
    "donde siempre tenemos adoración para que cuando llegues recibas la paz y la tranquilidad que solo Dios sabe brindar. " +
    "Ven y disfruta de este oasis de paz."
};

// ===== Utils =====
function clamp(n, min, max){ return Math.max(min, Math.min(max, n)); }
function isPlaceholder(url){
  return !url || url.includes("REEMPLAZA-ESTO");
}

// ===== Bind business info to UI =====
function hydrateBusiness(){
  const elTagline = document.getElementById("tagline");
  const elHours = document.getElementById("hours");
  const elHours2 = document.getElementById("hours2");
  const elAddress = document.getElementById("address");
  const elAddressLink = document.getElementById("addressLink");
  const elPhoneLink = document.getElementById("phoneLink");

  if (elTagline) elTagline.textContent = BUSINESS.tagline;
  if (elHours) elHours.textContent = BUSINESS.hours;
  if (elHours2) elHours2.textContent = BUSINESS.hours;
  if (elAddress) elAddress.textContent = BUSINESS.address;
  if (elAddressLink) elAddressLink.textContent = BUSINESS.address;
  if (elPhoneLink) elPhoneLink.textContent = BUSINESS.phonePretty;
}

// ===== Slider core =====
const slider = document.getElementById("slider");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsWrap = document.getElementById("dots");
const slides = Array.from(document.querySelectorAll(".slide"));

let index = 0;
let locked = false;

function goTo(i){
  if (locked) return;
  locked = true;

  index = clamp(i, 0, slides.length - 1);
  slider.style.transform = `translateX(${-index * 100}%)`;
  updateDots();

  setTimeout(() => (locked = false), 540);

  const id = slides[index]?.id || "slide-1";
  history.replaceState(null, "", `#${id}`);
}
function next(){ goTo(index + 1); }
function prev(){ goTo(index - 1); }

function buildDots(){
  dotsWrap.innerHTML = "";
  slides.forEach((_, i) => {
    const b = document.createElement("button");
    b.className = "dot";
    b.type = "button";
    b.setAttribute("aria-label", `Ir al slide ${i + 1}`);
    b.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(b);
  });
}
function updateDots(){
  const dots = Array.from(dotsWrap.querySelectorAll(".dot"));
  dots.forEach((d, i) => d.classList.toggle("active", i === index));
}

// ===== Events =====
document.addEventListener("click", (e) => {
  const goto = e.target.closest("[data-goto]");
  if (goto){
    e.preventDefault();
    const to = Number(goto.getAttribute("data-goto"));
    if (!Number.isNaN(to)) goTo(to);
    return;
  }

  // Pagos
  const pay = e.target.closest("[data-pay]");
  if (pay){
    e.preventDefault();
    const k = pay.getAttribute("data-pay");
    const url = PAY_LINKS[k];

    if (isPlaceholder(url)){
      alert("Ese enlace de pago está en placeholder. Abre app.js y pega tu link real en PAY_LINKS.");
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
    return;
  }

  // Contact actions
  const act = e.target.closest("[data-action]");
  if (act){
    e.preventDefault();
    const a = act.getAttribute("data-action");

    if (a === "call"){
      window.location.href = `tel:${BUSINESS.phone}`;
      return;
    }

    if (a === "whatsapp"){
      const msg = encodeURIComponent("Hola Cynthia’s Salon 👋 Quiero información y disponibilidad.");
      window.open(`https://wa.me/1${BUSINESS.whatsapp}?text=${msg}`, "_blank", "noopener,noreferrer");
      return;
    }

    if (a === "instagram"){
      window.open(BUSINESS.instagram, "_blank", "noopener,noreferrer");
      return;
    }

    if (a === "maps"){
      window.open(BUSINESS.maps, "_blank", "noopener,noreferrer");
      return;
    }
  }
});

// Flechas
prevBtn.addEventListener("click", prev);
nextBtn.addEventListener("click", next);

// Teclado
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") next();
  if (e.key === "ArrowLeft") prev();
});

// Swipe
let startX = 0;
let dragging = false;

slider.addEventListener("touchstart", (e) => {
  if (!e.touches || !e.touches[0]) return;
  dragging = true;
  startX = e.touches[0].clientX;
}, { passive: true });

slider.addEventListener("touchend", (e) => {
  if (!dragging) return;
  dragging = false;

  const endX = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientX : startX;
  const dx = endX - startX;

  if (Math.abs(dx) < 40) return;
  if (dx < 0) next();
  else prev();
}, { passive: true });

// Wheel horizontal (trackpad)
let wheelLock = false;
window.addEventListener("wheel", (e) => {
  const ax = Math.abs(e.deltaX);
  const ay = Math.abs(e.deltaY);
  if (ax <= ay) return;

  e.preventDefault();
  if (wheelLock) return;

  wheelLock = true;
  if (e.deltaX > 0) next();
  else prev();
  setTimeout(() => (wheelLock = false), 650);
}, { passive: false });

// Hash init
function initFromHash(){
  const hash = (location.hash || "").replace("#", "");
  if (!hash) return goTo(0);

  const i = slides.findIndex(s => s.id === hash);
  if (i >= 0) goTo(i);
  else goTo(0);
}

// ===== Boot =====
hydrateBusiness();
buildDots();
updateDots();
initFromHash();
window.addEventListener("hashchange", initFromHash);
