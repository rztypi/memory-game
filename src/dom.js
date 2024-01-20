const playAnimation = (animationClass) => {
  const header = document.querySelector(".header__title");
  if (header.classList.contains(animationClass)) {
    return;
  }
  header.classList.add(animationClass);
  header.addEventListener(
    "animationend",
    () => {
      console.log("done");
      header.classList.remove(animationClass);
    },
    {
      once: true,
    }
  );
};

export { playAnimation };
