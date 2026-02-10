// ===== Pagos (placeholders para que tú pegues Stripe / ATH / etc.) =====
const PAY_LINKS = {
  stripe: "PEGAR_STRIPE_AQUI",
  ath: "PEGAR_ATH_AQUI",
  paypal: "PEGAR_PAYPAL_AQUI",
  cashapp: "PEGAR_CASHAPP_AQUI"
};

// ===== Contacto real =====
const CONTACT = {
  phone: "787-590-3188",
  whatsapp: "7875903188", // solo números
  maps: "https://www.google.com/maps/search/?api=1&query=Trujillo+Alto+00976",
  instagram: "https://instagram.com/"
};

// ===== Slider =====
const slider = document.getElementById("slider");
const slides = document.querySelectorAll(".slide");
let i = 0;

function clamp(n, min, max){ return Math.max(min, Math.min(max, n)); }

function go(n){
  i = clamp(n, 0, slides.length - 1);
  slider.style.transform = `translateX(${-i * 100}%)`;

  const ids = ["slide-1","slide-2","slide-3","slide-4"];
  history.replaceState(null, "", `#${ids[i]}`);
}

document.getElementById("prev").onclick = () => go(i - 1);
document.getElementById("next").onclick = () => go(i + 1);

function isPlaceholder(url){
  return !url || url.startsWith("PEGAR_");
}

// ===== Click handlers =====
document.addEventListener("click", (e) => {
  const t = e.target;

  // Navegación entre slides
  if (t.dataset.goto){
    e.preventDefault();
    go(Number(t.dataset.goto));
    return;
  }

  // Pagos
  if (t.dataset.pay){
    e.preventDefault();
    const url = PAY_LINKS[t.dataset.pay];

    if (isPlaceholder(url)){
      alert("Ese enlace está en placeholder. Edita PAY_LINKS en app.js y pega tu link real.");
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
    return;
  }

  // Acciones de contacto
  if (t.dataset.action === "call"){
    e.preventDefault();
    window.location.href = `tel:${CONTACT.phone}`;
    return;
  }

  if (t.dataset.action === "whatsapp"){
    e.preventDefault();
    const msg = encodeURIComponent("Hola Cynthia’s Salon 👋 Quiero información y disponibilidad.");
    window.open(`https://wa.me/1${CONTACT.whatsapp}?text=${msg}`, "_blank", "noopener,noreferrer");
    return;
  }

  if (t.dataset.action === "maps"){
    e.preventDefault();
    window.open(CONTACT.maps, "_blank", "noopener,noreferrer");
    return;
  }

  if (t.dataset.action === "instagram"){
    e.preventDefault();
    window.open(CONTACT.instagram, "_blank", "noopener,noreferrer");
    return;
  }
});

// ===== Teclado =====
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") go(i + 1);
  if (e.key === "ArrowLeft") go(i - 1);
});

// ===== Init desde hash =====
(function initFromHash(){
  const h = (location.hash || "").replace("#", "");
  const map = { "slide-1":0, "slide-2":1, "slide-3":2, "slide-4":3 };
  if (map[h] !== undefined) go(map[h]);
  else go(0);
})();
