const main = document.querySelector('.main')
const load = document.getElementById('load')
onload = () => {
  setTimeout(() => {
    load.style.display = 'none'
  }, 1500)
}

// ============ Cancel ============== //
const cancel = document.getElementById('cancel')
cancel.addEventListener('click', () => {
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
  
  window.location = 'index.html'
})

// ============ Countdown ============ //
const minute = document.getElementById('minutes')
const seconde = document.getElementById('secondes')

const startMinutes = 5
let time = startMinutes * 60

const updateCountdown = setInterval(() => {
  time--
  
  const min = Math.floor(time / 60)
  const sec = time % 60
  // Insertion
  minute.innerHTML = `${min < 10 ? '0' : ''}${min}`
  seconde.innerHTML = `${sec < 10 ? "0" : ""}${sec}`

  // Auto cancel
  if (time == 0 || time < 1) {
    showModalCancel('Le temps est écoulé, votre transaction a été annulée')
    
    clearInterval(updateCountdown)

    main.style.display = 'none'

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

    setTimeout(() => {
      window.location = 'index.html'
    }, 3500)
  }
}, 1000)

let modalWrap = null;
const showModalCancel = (message) => {
  if (modalWrap !== null) {
    modalWrap.remove();
  }

  modalWrap = document.createElement('div');
  modalWrap.innerHTML = `
    <div class="modal fade" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header" bg-light'>
            <h4 style='display: flex; align-items: center; justify-content: center;' class="modal-title">
              <span style='color: #222'>Désolé...</span>
            </h4>
          </div>
          <div class="modal-body">
            <span style='font-size: 1.2rem;'>${message}</span>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.append(modalWrap);
  const modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
  modal.show();
}