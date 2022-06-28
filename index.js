// Variables
const startBtn = document.querySelector('.modal button'),
  userName = document.querySelector('.user span'),
  userTries = document.querySelector('.wrong-tries span'),
  cards = document.querySelectorAll('.memory-game-container .card'),
  correctAnswers = [];
let techs = [];

// console.log(techs);

//Events
startBtn.addEventListener('click', startBtnHandler);
cards.forEach((card) => {
  card.addEventListener('click', (e) => {
    const currentCard = e.target;
    const currentTech = currentCard.dataset.tech;
    currentCard.classList.add('flip')
    techs.push(currentTech);

    let correctAnswer = techs.reduce((prev, curr) => prev === curr);

    if (correctAnswer === true) correctAnswers.push(currentTech);

    console.log(correctAnswers, 'corrects answers');

    if (correctAnswer === true || correctAnswer !== currentTech) {
      techs = [];
    }
    cards.forEach((card) =>
            correctAnswers.forEach((corAnswer) => {
              if (corAnswer.includes(card.dataset.tech))
                card.classList.add('flip');
                else setTimeout(() => {
                  card.classList.remove('flip');
                }, 700);
            })
          );
    // Wrong tries handler
    if (!correctAnswer) {
      userTries.textContent = Number(userTries.innerText) + 1;
      setTimeout(() => {
      currentCard.classList.remove('flip');
    }, 700);
    }

    setTimeout(() => {
      currentCard.classList.remove('flip');
    }, 700);

    // currentCard.classList.add('flip');
    
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
}

function changeUserName(name) {
  userName.textContent = name;
}
