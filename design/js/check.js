const fullDate = document.getElementById('date')
const fullTime = document.getElementById('time')

window.addEventListener('load', () => {
  // Set Date and Time
  let today = new Date()
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  let date = today.getDate();

  let currentDate = `${date}/${month}/${year}`
  fullDate.innerText = currentDate

  let hours = addZero(today.getHours());
  let minutes = addZero(today.getMinutes());

  let currentTime = `${hours}:${minutes}`
  fullTime.innerText = currentTime


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

// Set minutes
function addZero(num){
  return num < 10 ? `0${num}`:num;
}

let modalWrap = null;
const showModalCancel = (message) => {
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
              <span style='color: #222'>Attention...</span>
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

// Return to home
const cancel = document.getElementById('cancel')

cancel.addEventListener('click', () => {
  showModalCancel('Voulez vous vraiment annuler et revenir à la page d\'accueil ?')

  const removeAll = document.querySelector('#yes')
  removeAll.addEventListener('click', () => {

    window.location = 'index.html'

    sessionStorage.removeItem('NAME');
    sessionStorage.removeItem('COUNTRY');
    sessionStorage.removeItem('MODE');
    sessionStorage.removeItem('PHONE');
    sessionStorage.removeItem('AMOUNT');
    sessionStorage.removeItem('XOF');

    sessionStorage.removeItem('NAME-BENEF');
    sessionStorage.removeItem('COUNTRY-BENEF');
    sessionStorage.removeItem('MODE-BENEF');
    sessionStorage.removeItem('PHONE-BENEF');
    sessionStorage.removeItem('AMOUNT-BENEF');
    sessionStorage.removeItem('XOF-BENEF');
  })
})

const sendData = document.getElementById('send')

sendData.addEventListener('click', () => {
  window.location = 'treatment.html'
})