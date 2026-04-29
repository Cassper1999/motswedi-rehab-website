window.addEventListener("scroll", () => {
  document.querySelector("nav").style.boxShadow =
    window.scrollY > 30 ? "0 12px 40px rgba(0,0,0,0.08)" : "none";
});
/* Theme glitter mouse trail */
document.addEventListener("mousemove", function(e) {
  const glitter = document.createElement("span");
  glitter.className = "glitter";
  glitter.style.left = e.clientX + "px";
  glitter.style.top = e.clientY + "px";
  const colors = ["#c79a3b", "#145c43", "#f6f4ef"];
  const color = colors[Math.floor(Math.random() * colors.length)];
  glitter.style.background = color;
  glitter.style.boxShadow = `0 0 14px ${color}`;
  document.body.appendChild(glitter);
  setTimeout(() => {
    glitter.remove();
  }, 700);
});
/* Impact number scroll animation */
const statCards = document.querySelectorAll(".impact div");
statCards.forEach(card => {
  card.classList.add("reveal-stat");
  const number = card.querySelector("h2");
  if (number) {
    number.dataset.target = number.innerText;
    number.innerText = "0";
  }
});
const statObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const card = entry.target;
      card.classList.add("active");
      const number = card.querySelector("h2");
      if (number && !number.dataset.done) {
        number.dataset.done = "true";
        const target = parseInt(number.dataset.target);
        let current = 0;
        const increment = Math.ceil(target / 45);
        const counter = setInterval(() => {
          current += increment;
          if (current >= target) {
            number.innerText = target;
            clearInterval(counter);
          } else {
            number.innerText = current;
          }
        }, 25);
      }
    }
  });
}, { threshold: 0.35 });
statCards.forEach(card => statObserver.observe(card));
