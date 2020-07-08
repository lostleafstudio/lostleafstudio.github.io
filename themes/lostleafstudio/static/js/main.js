feather.replace({ class: 'icons' })

const navToggler = document.querySelector('.navbar-toggler')
const nav = document.querySelector('.navbar-nav')

navToggler.addEventListener('click', function () {
  navToggler.classList.toggle('collapsed')
  nav.classList.toggle('nav-active')
})
