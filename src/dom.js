const playAnimation = (element, className) => {
  if (element.classList.contains(className)) {
    return;
  }
  element.classList.add(className);
  element.addEventListener(
    "animationend",
    () => {
      element.classList.remove(className);
    },
    { once: true }
  );
};

const playEndGameAnimation = (result) => {
  const header = document.querySelector(".header__title");
  playAnimation(header, `${result}-animation`);
};

const playResetAnimation = () => {
  const icon = document.querySelector(".game__reset-btn").querySelector("i");
  playAnimation(icon, "reset-animation");
};

export { playEndGameAnimation, playResetAnimation };
