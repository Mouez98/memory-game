// Variables
const startBtn = document.querySelector('.modal button');
const userName = document.querySelector('.user span');
const userTries = document.querySelector('.wrong-tries span');
const cards = document.querySelectorAll('.memory-game-container .card');
const tech = [];

//Events
startBtn.addEventListener('click', startBtnHandler);
cards.forEach((card) => {
  card.addEventListener('click', (e) => {
    const currentCard = e.target;
    const currentTech = currentCard.dataset.tech;
    tech.push(currentTech);

    let correctAnswer = tech.reduce((prev, curr) => prev === curr);

    currentCard.classList.add('clicked');

    console.log(currentCard.dataset.tech);

    if (!correctAnswer ) {
        cards.forEach(card => console.log(card.dataset.tech === currentTech) )
    //   currentCard.previousElementSibling.classList.remove('clicked')
      userTries.textContent = Number(userTries.innerText) + 1;
      setTimeout(() => {
        currentCard.classList.remove('clicked');
      }, 500);
    }
  });
});
//Functions
function startBtnHandler(e) {
  const modal = e.target.parentNode;
  const modalClasses = [...modal.classList];

  if (modalClasses.includes('d-flex')) {
    modal.classList.remove('d-flex');
    modal.classList.add('d-none');
  }

  let yourName = prompt('enter your name');

  changeUserName(yourName);
  //    userTries += userTries
}

function changeUserName(name) {
  userName.textContent = name;
}
