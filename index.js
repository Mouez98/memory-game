// Variables
const startBtn = document.querySelector('.modal button'),
  userName = document.querySelector('.user span'),
  userTries = document.querySelector('.wrong-tries span'),
  cards = document.querySelectorAll('.memory-game-container .card'),
  correctAnswers = [],
  orderRange = [...Array(cards.length).keys()];
let techs = [];

// Events
startBtn.addEventListener('click', startBtnHandler);

cards.forEach((card, index) => {
  // Change Cards orders
  shufle(orderRange);
  card.style.order = orderRange[index];

  card.addEventListener('click', (e) => {
    const currentCard = e.target;
    const currentTech = currentCard.dataset.tech;
    currentCard.classList.add('flip');
    techs.push(currentTech);

    let correctAnswer = techs.reduce((prev, curr) => prev === curr);

    if (correctAnswer === true) correctAnswers.push(currentTech);



    if (correctAnswer === true || correctAnswer !== currentTech) {
      techs = [];
    }
    
    // Wrong tries handler
    if (!correctAnswer) {
      userTries.textContent = Number(userTries.innerText) + 1;
     
    }

    currentCard.classList.add('flip');

    setTimeout(() => {
        cards.forEach(card => {
          let answer = correctAnswers.join('');

          if (correctAnswer === true && answer.includes(currentTech) ) {
            currentCard.classList.add('flip') 
          }
          

       
      if(!correctAnswer && !answer.includes(card.dataset.tech)) {
        // cards.forEach()
        currentCard.classList.remove('flip')
      }
    })
    }, 700);
  
  })
})

    // currentCard.classList.add('flip');


// Functions

// Start Function
function startBtnHandler(e) {
  const modal = e.target.parentNode;

  // Remove modal from DOM
  modal.remove();

  // Get user input
  let yourName = prompt('enter your name');

  changeUserName(yourName);
}

// Change user name
function changeUserName(name) {
  const verfiyName =
    name === '' || !name ? `Guest${Math.trunc(Math.random() * 1010)}` : name;
  userName.textContent = verfiyName;
}

// Shuffle Function

function shufle(array) {
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    // Get random number
    random = Math.floor(Math.random() * current);

    // Descrease by one
    current--;

    // Switch temp with random & random with temp
    [array[current], array[random]] = [array[random], array[current]];
  }
  return array;
}
