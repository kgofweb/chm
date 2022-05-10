const modeTransfert = {
  russie: ['SberBank', 'Tinkoff', 'VTB', 'Autre'],
  civ: ['Orange Money', 'Moov Money', 'Wave Money', 'MTN Mobile Money'],
  benin: ['Moov Money', 'MTN Mobile Money'],
  senegal: ['Orange Money', 'Wave Money'],
  gabon: ['MTN Mobile Money', 'AIRTEL Mobile Money'],
  guinee: ['Orange Money', 'MTN  areeba'],
  mali: ['Orange Money'],
  niger: ['Moov Flooz'],
  congo: ['AIRTEL Mobile Money', 'MTN Mobile Money']
}

const phoneRegion = {
  russie: ['RUS'],
  benin: ['BEN'],
  civ: ['CIV'],
  senegal: ['SEN'],
  gabon: ['GAB'],
  congo: ['CGB'],
  guinee: ['GIN'],
  mali: ['MLI'],
  niger: ['NER'],
}

// ==================== DOM Elements ==================== //
const count = document.getElementById('country')
const count2 = document.getElementById('country2')
const mode = document.getElementById('modeSend')
const mode2 = document.getElementById('modeSend2')
// Money
const montant = document.getElementById('montant')
const total = document.getElementById('total')
const xof = document.getElementById('xof')
const xof2 = document.getElementById('xof2')
// Tel Number
const phoneNumber = document.getElementById('phone')
const phoneNumber2 = document.getElementById('phone2')
// Redirect
const redicet = document.getElementById('check')
const nameExp = document.querySelector('.nameExp')
const numberTelExp = document.querySelector('.numberTel')
const nameBenef = document.querySelector('.nameBenef')
const numberTelBenef = document.querySelector('.numberTelBenef')
const amount = document.querySelector('.amount')

console.log(numberTelBenef);



// ==================== Event Listener Expediteur ==================== //
count.addEventListener('change', function() {
  // Select Value
  let selectOption = modeTransfert[this.value]
  let numRegion = phoneRegion[this.value]

  // Change Money XOF
  if (count.value == 'russie') {
    xof.innerText = 'RUB'
  } else {
    xof.innerText = 'FCFA'
  }

  // Active input money
  if (count) {
    montant.disabled = false
  } else {
    montant.disabled = true
  }
  
  // Remove old selection
  while(mode.options.length > 0) {
    mode.options.remove(0)
  }
  // Phone Region
  while(phoneNumber.options.length > 0) {
    phoneNumber.options.remove(0)
  }

  // From transfert mode table
  Array.from(selectOption).forEach(function(el) {
    let option = new Option(el, el)
    // Append child
    mode.appendChild(option)
  })
  // Phone Region
  Array.from(numRegion).forEach(function(el) {
    let option = new Option(el, el)

    phoneNumber.appendChild(option)
  })
})

// ================= Event Listener Béneficiaire ================= //
count2.addEventListener('change', function() {
  // Select Value
  let selectOption = modeTransfert[this.value]
  let numRegion = phoneRegion[this.value]
  
  // Mode Send
  while(mode2.options.length > 0) {
    mode2.options.remove(0)
  }
  // Phone Region
  while(phoneNumber2.options.length > 0) {
    phoneNumber2.options.remove(0)
  }

  Array.from(selectOption).forEach(function(el) {
    let option = new Option(el, el)
    mode2.appendChild(option)
  })
  // Phone Region
  Array.from(numRegion).forEach(function(el) {
    let option = new Option(el, el)

    phoneNumber2.appendChild(option)
  })

  // Change Money XOF
  if (count2.value == 'russie') {
    xof2.innerText = 'RUB'
  } else {
    xof2.innerText = 'FCFA'
  }
})

// ======= Algorithm Convertion Money ========= //
let taux = 0.111
montant.addEventListener('input', () => {
  // Get user input
  const userInputValue = montant.value
  const totalMoney = new Intl.NumberFormat().format(userInputValue * taux)

  total.innerHTML = `<b>${totalMoney}</b>`
})

// ============ Management Phone Number 1 ============== //
let cleave = new Cleave('#phoneNumber', {
  phone: true,
  phoneRegionCode: 'RUS'
})
phoneNumber.addEventListener('change', function() {
  cleave.setPhoneRegionCode(this.value)
  cleave.setRawValue('')
})

// ============ Management Phone Number 2 ============== //
let cleave2 = new Cleave('#phoneNumber2', {
  phone: true,
  phoneRegionCode: 'RUS'
})
phoneNumber2.addEventListener('change', function() {
  cleave2.setPhoneRegionCode(this.value)
  cleave2.setRawValue('')
})

// ============= Redirect Pages ============ //
redicet.addEventListener('click', checkPage)

function showAlert(message) {
  const div = document.createElement('div')
  div.className = `alert alert-warning`
  div.appendChild(document.createTextNode(message))
  const transfert = document.getElementById('transfert')
  const form = document.querySelector('form')
  transfert.insertBefore(div, form)

  setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

function checkPage (e) {
  e.preventDefault()

  if(nameExp.value == '' || numberTelExp.value == '' || nameBenef.value == '' || numberTelBenef.value == '' || amount.value == '') {
    if(nameExp.value == '') {
      showAlert('Renseigner le nom de expéditeur...')
    } else if(numberTelExp.value == '') {
      showAlert('Renseigner le numéro de téléphone de l\'expéditeur...')
    } else if(amount.value == '') {
      showAlert('Renseigner le montant')
    } else if (nameBenef.value == '') {
      showAlert('Renseigner le nom du bénéficiaire...')
    } else if (numberTelBenef.value == '') {
      showAlert('Renseigner le numéro de téléphone du bénéficiaire...')
    } else {
      showAlert('Veuillez renseigner tous les champs')
    }
  } else {
    window.location = 'check.html'
  }
}