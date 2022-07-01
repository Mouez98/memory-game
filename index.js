// Variables
const startBtn = document.querySelector('.modal button'),
  userName = document.querySelector('.user span'),
  userTries = document.querySelector('.wrong-tries span'),
  cardsContainer = document.querySelector('.memory-game-container'),
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
    
    flipCard(card)
  
  })
})

    


// Functions

// Flip card
function flipCard(selectedCrad) {

  // add a flip class to the selected card
  selectedCrad.classList.add('flip')

  //Collect Flipped cards
  const allFlippedCards =  [...cards].filter(flippedCard => flippedCard.classList.contains('flip'))

  if(allFlippedCards.length === 2) {
    
    //Stop Clicking
      stopClicking()

      checkMatchedCard(allFlippedCards[0], allFlippedCards[1])
    
  }
}

//Stop Clicking Function
function stopClicking() {

  // Add class no clicking on cradsContainer
    cardsContainer.classList.add('no-click') 

    setTimeout(() => {

      // Remove class no clicking on cradsContainer
      cardsContainer.classList.remove('no-click')
    }, 1000)
}

// Check matched Cards 
function checkMatchedCard(firstCard, secondCard){
    
  if(firstCard.dataset.tech !== firstCard.dataset.tech) {
      firstCard.classList.remove('flip')
      secondCard.classList.remove('flip')
      userTries.textContent =  ++Number(userTries.value) 
  }
}

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
