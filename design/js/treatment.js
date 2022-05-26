const load = document.getElementById('load')

onload = () => {
  setTimeout(() => {
    load.style.display = 'none'
  }, 1500)
}

const cancel = document.getElementById('cancel')
cancel.addEventListener('click', () => {
  window.location = 'check.html'
})