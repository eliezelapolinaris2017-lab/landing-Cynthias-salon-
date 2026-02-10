const PAY_LINKS = {
  stripe: "PEGAR_STRIPE",
  ath: "PEGAR_ATH",
  paypal: "PEGAR_PAYPAL",
  cashapp: "PEGAR_CASHAPP"
};

const CONTACT = {
  phone: "787-590-3188",
  whatsapp: "7875903188",
  maps: "https://www.google.com/maps/search/?api=1&query=Trujillo+Alto+00976",
  instagram: "https://instagram.com/"
};

const slider = document.getElementById("slider");
const slides = document.querySelectorAll(".slide");
let i=0;

function go(n){
  i=Math.max(0,Math.min(n,slides.length-1));
  slider.style.transform=`translateX(${-i*100}%)`;
}

document.getElementById("prev").onclick=()=>go(i-1);
document.getElementById("next").onclick=()=>go(i+1);

document.addEventListener("click", e=>{

  if(e.target.dataset.goto) go(+e.target.dataset.goto);

  if(e.target.dataset.pay){
    const url=PAY_LINKS[e.target.dataset.pay];
    if(url.startsWith("PEGAR")) alert("Edita PAY_LINKS en app.js");
    else window.open(url,"_blank");
  }

  if(e.target.dataset.action==="call")
    location.href=`tel:${CONTACT.phone}`;

  if(e.target.dataset.action==="whatsapp")
    window.open(`https://wa.me/1${CONTACT.whatsapp}`,"_blank");

  if(e.target.dataset.action==="maps")
    window.open(CONTACT.maps,"_blank");

  if(e.target.dataset.action==="instagram")
    window.open(CONTACT.instagram,"_blank");

});

window.onkeydown=e=>{
  if(e.key==="ArrowRight") go(i+1);
  if(e.key==="ArrowLeft") go(i-1);
};
