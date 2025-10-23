document.addEventListener("DOMContentLoaded", () => {
  const stack = document.querySelector(".stack");
  if (!stack) return;

  const cards = Array.from(stack.children).filter(c => c.classList.contains("card"));
  cards.reverse().forEach(card => stack.appendChild(card));

  const ANIM_MS = 1300;
  let autoplayInterval = null;
  let animating = false;

  function moveCard() {
    if (animating) return;
    const lastCard = stack.lastElementChild;
    if (!lastCard.classList.contains("card")) return;

    animating = true;
    lastCard.classList.add("swap");
    void lastCard.offsetWidth;

    setTimeout(() => {
      lastCard.classList.remove("swap");
      stack.insertBefore(lastCard, stack.firstElementChild);
      animating = false;
    }, ANIM_MS);
  }

  stack.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    const lastCard = stack.lastElementChild;
    if (card !== lastCard || animating) return;

    animating = true;
    card.classList.add("swap");
    void card.offsetWidth;

    setTimeout(() => {
      card.classList.remove("swap");
      stack.insertBefore(card, stack.firstElementChild);
      animating = false;
      resetAutoplay();
    }, ANIM_MS);
  });

  stack.addEventListener("mouseenter", () => clearInterval(autoplayInterval));
  stack.addEventListener("mouseleave", resetAutoplay);

  function startAutoplay() {
    if (autoplayInterval) clearInterval(autoplayInterval);
    autoplayInterval = setInterval(moveCard, 4000);
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(moveCard, 4000);
  }

  if (cards.length > 1) startAutoplay();
});
