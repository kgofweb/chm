window.addEventListener('load', () => {
  // Expéditeur
  const nameExp = sessionStorage.getItem('NAME')
  const sessCountryExp = sessionStorage.getItem('COUNTRY')
  const sessModeExp = sessionStorage.getItem('MODE')
  const sessNumberTelExp = sessionStorage.getItem('PHONE')
  const sessAmountExp = sessionStorage.getItem('AMOUNT')
  const xof = sessionStorage.getItem('XOF')

  document.getElementById('name-exp').innerHTML = `${nameExp}`
  document.getElementById('country-exp').innerHTML = `${sessCountryExp}`
  document.getElementById('modeSend-exp').innerHTML = `${sessModeExp}`
  document.getElementById('number-exp').innerHTML = `${sessNumberTelExp}`
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
              <span style='color: #222'>Annulation</span>
            </h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>${message}</p>
          </div>
          <div class="modal-footer bg-light">
            <button type="button" class="btn btn-secondary" id='yes'>Oui</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Non</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.append(modalWrap);
  const modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
  modal.show();
}

// Return to the home
cancel.addEventListener('click', () => {
  showModal('Voulez vous vraiment annuler ?')

  const removeAll = document.querySelector('#yes')
  removeAll.addEventListener('click', () => {
    window.location = 'index.html'
  })
})