// ============ LOADER ================ //
// const load = document.getElementById('load')

// onload = () => {
//   setTimeout(() => {
//     load.style.display = 'none'
//   }, 2200)
// }

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

// ==================== Event Listener Sender ==================== //
count.addEventListener('change', function () {
  // Select Value
  let selectOption = modeTransfert[this.value]

  // Change Money XOF
  if (count.value == 'russie' && count) {
    xof.innerText = 'RUB'
    mode.disabled = true
    phoneNumber.disabled = true
    montant.disabled = true
    total.disabled = true
    count2.disabled = true
    mode2.disabled = true
    redicet.disabled = true
    document.querySelector('.numberTel').disabled = true
    document.querySelector('.nameExp').disabled = true
    document.querySelector('.nameBenef').disabled = true
    document.querySelector('.numberTelBenef').disabled = true

    showModal(`
      Les transferts depuis la Russie sont momentairement intérrompus.
    `)
  } else {
    xof.innerText = 'FCFA'
    document.querySelector('.numberTel').disabled = false
    document.querySelector('.nameExp').disabled = false
    document.querySelector('.nameBenef').disabled = false
    document.querySelector('.numberTelBenef').disabled = false
    mode.disabled = false
    phoneNumber.disabled = false
    montant.disabled = false
    count2.disabled = false
    mode2.disabled = false
    redicet.disabled = false
  }

  // Conversion Rate
  if (count.value == 'civ') {
    let rate = .0912

    montant.addEventListener('input', () => {
      // Get user input
      const userInputValue = montant.value
      const totalMoney = new Intl.NumberFormat().format(userInputValue * rate)
    
      total.innerHTML = `<b>${totalMoney}</b>`
    })
  } else if (count.value == 'guinee') {
    let rate = .0400
    montant.addEventListener('input', () => {
      // Get user input
      const userInputValue = montant.value
      const totalMoney = new Intl.NumberFormat().format(userInputValue * rate)
    
      total.innerHTML = `<b>${totalMoney}</b>`
    })
  }

  // Remove old selection
  while (mode.options.length > 0) {
    mode.options.remove(0)
  }

  // From transfert mode table
  Array.from(selectOption).forEach(function (el) {
    let option = new Option(el, el)
    // Append child
    mode.appendChild(option)
  })
})

// ================= Event Listener Receiver ================= //
count2.addEventListener('change', function () {
  // Select Value
  let selectOption = modeTransfert[this.value]

  // Mode Send
  while (mode2.options.length > 0) {
    mode2.options.remove(0)
  }

  Array.from(selectOption).forEach(function (el) {
    let option = new Option(el, el)
    mode2.appendChild(option)
  })

  // Change Money XOF
  if (count2.value == 'russie') {
    xof2.innerText = 'RUB'
  } else {
    xof2.innerText = 'FCFA'
  }
})

// ======= Algorithm Convertion Money ========= //
// let taux = 0.111
// montant.addEventListener('input', () => {
//   // Get user input
//   const userInputValue = montant.value
//   const totalMoney = new Intl.NumberFormat().format(userInputValue * taux)

//   total.innerHTML = `<b>${totalMoney}</b>`
// })

// ============ Management Phone Number 1 ============== //
let cleave = new Cleave('#phoneNumber', {
  phone: true,
  phoneRegionCode: 'RUS'
})
phoneNumber.addEventListener('change', function () {
  cleave.setPhoneRegionCode(this.value)
  cleave.setRawValue('')
})

// ============ Management Phone Number 2 ============== //
let cleave2 = new Cleave('#phoneNumber2', {
  phone: true,
  phoneRegionCode: 'RUS'
})
phoneNumber2.addEventListener('change', function () {
  cleave2.setPhoneRegionCode(this.value)
  cleave2.setRawValue('')
})

// ============= Redirect Pages ============ //
const redicet = document.getElementById('check')
const nameExp = document.querySelector('.nameExp')
const numberTelExp = document.querySelector('.numberTel')
const nameBenef = document.querySelector('.nameBenef')
const numberTelBenef = document.querySelector('.numberTelBenef')
const amount = document.querySelector('.amount')

redicet.addEventListener('click', checkPage)

// =============== Error Indication ================= //
let modalWrap = null;
const showModal = (message) => {
  if (modalWrap !== null) {
    modalWrap.remove();
  }

  modalWrap = document.createElement('div');
  modalWrap.innerHTML = `
    <div class="modal fade" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-light">
            <h4 style='display: flex; align-items: center; justify-content: center;' class="modal-title">
              <i style='color: #ff7675; font-size: 3rem; margin-right: .5rem' class="uil uil-annoyed"></i>
              <span style='color: #222'>Oupss...</span>
            </h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>${message}</p>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.append(modalWrap);
  const modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
  modal.show();
}
// ============ Verification =============== //
function checkPage(e) {
  e.preventDefault()

  if (nameExp.value == '' || numberTelExp.value == '' || nameBenef.value == '' || numberTelBenef.value == '' || amount.value == '') {
    showModal('Veuillez renseigner tous les champs')
  } else {
    // Expéditeur
    let sessNameExp = nameExp.value
    let sessCountryExp = count.options[count.selectedIndex].text
    let sessModeExp = mode.options[mode.selectedIndex].text
    let sessNumberTelExp = numberTelExp.value
    let sessAmountExp = amount.value
    let sessXofExp = xof.innerText

    sessionStorage.setItem('NAME', sessNameExp)
    sessionStorage.setItem('COUNTRY', sessCountryExp)
    sessionStorage.setItem('MODE', sessModeExp)
    sessionStorage.setItem('PHONE', sessNumberTelExp)
    sessionStorage.setItem('AMOUNT', sessAmountExp)
    sessionStorage.setItem('XOF', sessXofExp)

    // Beneficiaire
    let sessNameBenef = nameBenef.value
    let sessCountryBenef = count2.options[count2.selectedIndex].text
    let sessModeBenef = mode2.options[mode2.selectedIndex].text
    let sessNumberTeBenef = numberTelBenef.value
    let sessAmountBenef = total.innerText
    let sessXofBenef = xof2.innerText

    sessionStorage.setItem('NAME-BENEF', sessNameBenef)
    sessionStorage.setItem('COUNTRY-BENEF', sessCountryBenef)
    sessionStorage.setItem('MODE-BENEF', sessModeBenef)
    sessionStorage.setItem('PHONE-BENEF', sessNumberTeBenef)
    sessionStorage.setItem('AMOUNT-BENEF', sessAmountBenef)
    sessionStorage.setItem('XOF-BENEF', sessXofBenef)

    window.location = 'check.html'
  }
}

// ============== Scroll Reveal ============== //
const sr = ScrollReveal({
  distance: '90px',
  duration: 1000,
})

sr.reveal(`.home`, { origin: 'top', delay: 300 })
sr.reveal(`#transfert`, { origin: 'bottom', delay: 500 })