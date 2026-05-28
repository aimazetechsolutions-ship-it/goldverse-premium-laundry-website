const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");

function updateHeader() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 18);
}

navToggle?.addEventListener("click", () => {
  nav?.classList.toggle("is-open");
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => nav.classList.remove("is-open"));
});

const whatsappWidget = document.querySelector("[data-whatsapp-widget]");
const whatsappChat = whatsappWidget?.querySelector("[data-whatsapp-chat]");
const whatsappToggle = whatsappWidget?.querySelector("[data-whatsapp-toggle]");
const whatsappClose = whatsappWidget?.querySelector("[data-whatsapp-close]");
const whatsappMessage = whatsappWidget?.querySelector("[data-whatsapp-message]");
const whatsappSend = whatsappWidget?.querySelector("[data-whatsapp-send]");
const whatsappNumber = "923001111897";
const whatsappDefaultMessage = "Assalam-o-Alaikum GoldVerse, I would like to book a laundry pickup.";

function setWhatsAppOpen(isOpen) {
  if (!whatsappChat || !whatsappToggle) return;
  whatsappChat.hidden = !isOpen;
  whatsappToggle.setAttribute("aria-expanded", String(isOpen));
  whatsappToggle.setAttribute("aria-label", isOpen ? "Close WhatsApp chat" : "Open WhatsApp chat");
  if (isOpen) {
    whatsappMessage?.focus();
  }
}

whatsappToggle?.addEventListener("click", () => {
  setWhatsAppOpen(Boolean(whatsappChat?.hidden));
});

whatsappClose?.addEventListener("click", () => {
  setWhatsAppOpen(false);
});

whatsappSend?.addEventListener("click", () => {
  const message = whatsappMessage?.value.trim() || whatsappDefaultMessage;
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  const chatWindow = window.open(url, "_blank", "noopener");
  if (chatWindow) {
    chatWindow.opener = null;
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && whatsappChat && !whatsappChat.hidden) {
    setWhatsAppOpen(false);
  }
});

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

if (window.lucide) {
  window.lucide.createIcons();
}
