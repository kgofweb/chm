window.addEventListener('load', () => {
  // Expéditeur
  const nameExp = sessionStorage.getItem('NAME')
  const sessCountryExp = sessionStorage.getItem('COUNTRY')
  const sessModeExp = sessionStorage.getItem('MODE')

  document.getElementById('name-exp').innerHTML = nameExp
  document.getElementById('country-exp').innerHTML = sessCountryExp
  document.getElementById('modeSend-exp').innerHTML = sessModeExp
})


// DOM Handle
const cancel = document.getElementById('cancel')

// Return to the home
cancel.addEventListener('click', () => {
  window.location = 'index.html'
})