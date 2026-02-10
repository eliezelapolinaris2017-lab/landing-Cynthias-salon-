const PAY_LINKS = {
  stripe: "PEGAR_STRIPE_AQUI",
  ath: "PEGAR_ATH_AQUI",
  paypal: "PEGAR_PAYPAL_AQUI",
  cashapp: "PEGAR_CASHAPP_AQUI"
};

const CONTACT = {
  phone: "787-590-3188",
  whatsapp: "7875903188",
  maps: "https://www.google.com/maps/search/?api=1&query=Trujillo+Alto+00976",
  instagram: "https://instagram.com/"
};

/* slider */
const slider = document.getElementById("slider");
const slides = document.querySelectorAll(".slide");
let i = 0;

function go(n){
  i = Math.max(0, Math.min(n, slides.length-1));
  slider.style.transform = `translateX(${-i*100}%)`;
}

document.getElementById("prev").onclick=()=>go(i-1);
document.getElementById("next").onclick=()=>go(i+1);

/* navegación por enlaces */
document.addEventListener("click", e=>{

  const g = e.target.dataset.goto;
  if(g){ go(+g); }

  const pay = e.target.dataset.pay;
  if(pay){
    const url = PAY_LINKS[pay];
    if(url.startsWith("PEGAR")) alert("Edita PAY_LINKS en app.js");
    else window.open(url,"_blank");
  }

  const act = e.target.dataset.action;
  if(act==="call") location.href=`tel:${CONTACT.phone}`;
  if(act==="whatsapp")
    window.open(`https://wa.me/1${CONTACT.whatsapp}`,"_blank");
  if(act==="maps") window.open(CONTACT.maps,"_blank");
  if(act==="instagram") window.open(CONTACT.instagram,"_blank");

});

/* teclado */
window.onkeydown=e=>{
  if(e.key==="ArrowRight") go(i+1);
  if(e.key==="ArrowLeft") go(i-1);
};
