(function () {
  const setting = localStorage.getItem("setting") || '{"theme":"light"}';
  const { theme } = JSON.parse(setting);

  if (theme === "dark") {
    document.body.classList.add("darkTheme");
    return;
  }
})();
