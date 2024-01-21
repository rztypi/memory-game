const getPreferredTheme = () => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const getStoredTheme = () => {
  return localStorage.getItem("theme");
};

const setStoredTheme = (theme) => {
  return localStorage.setItem("theme", theme);
};

const setDataTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
};

const getActiveTheme = () => {
  return getStoredTheme() ?? getPreferredTheme();
};

const initDataTheme = () => {
  setDataTheme(getActiveTheme());
};

export {
  getPreferredTheme,
  getStoredTheme,
  setStoredTheme,
  setDataTheme,
  getActiveTheme,
  initDataTheme,
};
