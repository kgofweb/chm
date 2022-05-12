window.addEventListener('load', () => {
  // Expéditeur
  const nameExp = sessionStorage.getItem('NAME')
  const sessCountryExp = sessionStorage.getItem('COUNTRY')
  const sessModeExp = sessionStorage.getItem('MODE')
  const sessNumberTelExp = sessionStorage.getItem('PHONE')
  const sessAmountExp = sessionStorage.getItem('AMOUNT')
  const xof = sessionStorage.getItem('XOF')

  document.getElementById('name-exp').innerHTML = nameExp
  document.getElementById('country-exp').innerHTML = sessCountryExp
  document.getElementById('modeSend-exp').innerHTML = sessModeExp
  document.getElementById('number-exp').innerHTML = sessNumberTelExp
  document.getElementById('amountSend-exp').innerHTML = `${new Intl.NumberFormat().format(sessAmountExp)} <b>${xof}</b>`
  

  // Beneficiaire
  const nameBenef = sessionStorage.getItem('NAME-BENEF')
  const sessCountryBenef = sessionStorage.getItem('COUNTRY-BENEF')
  const sessModeBenef = sessionStorage.getItem('MODE-BENEF')
  const sessNumberTeBenef = sessionStorage.getItem('PHONE-BENEF')
  const sessAmountBenef = sessionStorage.getItem('AMOUNT-BENEF')
  const xof2 = sessionStorage.getItem('XOF-BENEF')

  document.getElementById('name-benef').innerHTML = nameBenef
  document.getElementById('country-benef').innerHTML = sessCountryBenef
  document.getElementById('modeSend-benef').innerHTML = sessModeBenef
  document.getElementById('number-benef').innerHTML = sessNumberTeBenef
  document.getElementById('amountReceive-benef').innerHTML = `${sessAmountBenef} <b>${xof2}</b>`
})


// DOM Handle
const cancel = document.getElementById('cancel')

// Return to the home
cancel.addEventListener('click', () => {
  window.location = 'index.html'
})