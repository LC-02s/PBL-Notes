;(function () {
  const currentTheme = window.localStorage.getItem('theme') || 'light'

  if (currentTheme === 'dark') {
    document.body.classList.add('dark')
    return
  }
})()
