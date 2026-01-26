// =========================
// Intro typing effect 
// =========================
const introOverlay = document.getElementById("introOverlay");
const introText = document.getElementById("introText");
const introHint = document.getElementById("introHint");
const portfolioBtn = document.getElementById("portfolioBtn");

// blinking cursor 
let cursor = document.createElement("span");
cursor.className = "cursor";
cursor.textContent = "|";
introText.appendChild(cursor);

window.onload = () => {
  introText.textContent = "Hi"; // Initial Hi
  introText.appendChild(cursor);
  introHint.style.display = "block";
};

const message = "Welcome to my website...";
let charIndex = 0;
let typingStarted = false;

// Click to start typing the message
introOverlay.addEventListener("click", () => {
  if (!typingStarted) {
    typingStarted = true;
    introHint.style.display = "none";

    // Remove initial "Hi" before typing main message
    introText.textContent = "";
    introText.appendChild(cursor);

    typeMessage();
  } else {
    introOverlay.style.display = "none";
  }
});

// Typing function
function typeMessage() {
  if (charIndex < message.length) {
    cursor.insertAdjacentText("beforebegin", message.charAt(charIndex));
    charIndex++;
    setTimeout(typeMessage, 80);
  } else {
    portfolioBtn.style.display = "inline-block";
  }
}

// Portfolio button jump
portfolioBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  introOverlay.style.display = "none";
  document.getElementById("portfolio").scrollIntoView({ behavior: "smooth" });
});

// =========================
// Animate Skills
// =========================
const skillBars = document.querySelectorAll(".skill-progress");
function animateSkills() {
  skillBars.forEach(bar => {
    const rect = bar.getBoundingClientRect();
    if (
      rect.top < window.innerHeight &&
      rect.bottom > 0 &&
      (bar.style.width === "" || bar.style.width === "0%")
    ) {
      bar.style.width = bar.dataset.skill;
      bar.textContent = bar.dataset.skill;
    }
  });
}
window.addEventListener("scroll", animateSkills);
window.addEventListener("load", animateSkills);

// =========================
// Portfolio modal (updated)
// =========================
const modal = document.getElementById("portfolioModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalLink = document.getElementById("modalLink"); // <-- new link support
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".portfolio-item").forEach(item => {
  item.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImg.src = item.querySelector("img").src;
    modalTitle.textContent = item.dataset.title;
    modalDesc.textContent = item.dataset.desc;

    // if project has a live link
    if (item.querySelector("a")) {
      modalLink.href = item.querySelector("a").href;
      modalLink.style.display = "inline-block";
    } else {
      modalLink.style.display = "none";
    }
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// =========================
// Menu toggle for mobile
// =========================
const menuToggle = document.getElementById("menuToggle");
const menu = document.querySelector("#mainNav .menu");
if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("show");
  });
}

// =========================
// Smooth scroll & highlight menu links
// =========================
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth" });
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
    if (menu.classList.contains("show")) menu.classList.remove("show");
  });
});

// Highlight on scroll
window.addEventListener("scroll", () => {
  let scrollPos = window.scrollY + 120;
  navLinks.forEach(link => {
    const section = document.querySelector(link.getAttribute("href"));
    if (
      section.offsetTop <= scrollPos &&
      section.offsetTop + section.offsetHeight > scrollPos
    ) {
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    }
  });
});

// =========================
// auto-hide nav on scroll
// =========================
let lastScrollTop = 0;
window.addEventListener("scroll", () => {
  const nav = document.getElementById("mainNav");
  let st = window.scrollY;
  if (st > lastScrollTop) {
    nav.style.top = "-70px";
  } else {
    nav.style.top = "0";
  }
  lastScrollTop = st <= 0 ? 0 : st;
});
