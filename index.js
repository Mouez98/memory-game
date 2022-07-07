/// Variables ///
const startBtn = document.querySelector('.modal button'),
  userName = document.querySelector('.user span'),
  userTries = document.querySelector('.wrong-tries span'),
  cardsContainer = document.querySelector('.memory-game-container'),
  cards = document.querySelectorAll('.memory-game-container .card'),
  orderRange = [...Array(cards.length).keys()],
  succesSound = document.getElementById('success'),
  bgSound = document.getElementById('bg'),
  loseSound = document.getElementById('lose'),
  domTimer = document.querySelector('.timer'),
  difficultyBtns = document.querySelectorAll('.game-difficulty li'),
  volumeBtns = document.querySelectorAll('.volume img'),
  modal = document.querySelector('.modal');

  const highestScore = {
    name : 'Mouez',
    wrongTries: 1,
    time: 25
  }

  const winActions = () => {
    alert('Congratulations you made it')
    userTries.textContent = 0;
    document.querySelector('.name').textContent = highestScore.name
    document.querySelector('.tries').textContent = highestScore.wrongTries
    document.querySelector('.time').textContent = highestScore.time
  }

  const loseActions = () => {
    alert('Ops! failed try again')
        userTries.textContent = 0;
  }

/// Events ///
startBtn.addEventListener('click', startBtnHandler);

// Sound btns events
volumeBtns.forEach((volume) =>
  volume.addEventListener('click', bgSoundHandler)
);
// Shuffle cards & Add events
cards.forEach((card, index) => {

  // Change Cards orders
  shufle(orderRange);
  card.style.order = orderRange[index];
  
  // Card events
  card.addEventListener('click', (e) => {
    const currentCard = e.target;
    const correctCards = [...cards].filter(card => card.classList.contains('has-match'))
     console.log(correctCards.length);
     console.log(cards.length);
    if(correctCards.length === cards.length) {
      alert('Congratulations you made it')
      userTries.textContent = 0
    } 

    flipCard(currentCard);
  });
});

//Set Game difficulty
difficultyBtns.forEach((level) =>
  level.addEventListener('click', gameDifficulty)
);

/// Functions ///

// Start game with chosen difficulty
function gameDifficulty (e) {
  if (e.target.dataset.difficulty === 'easy') {
    domTimer.setAttribute('data-time', 60000);
  }
  if (e.target.dataset.difficulty === 'medium') {
    domTimer.setAttribute('data-time', 45000);
  }
  if (e.target.dataset.difficulty === 'hard') {
    domTimer.setAttribute('data-time', 25000);
  }
  startBtnHandler();
}

function bgSoundHandler(e) {
  //Check which icon is displayed and change bgSound state
    if (e.target.classList.contains('sound-on')) {
      e.target.classList.add('d-none');
      e.target.nextElementSibling.classList.remove('d-none');
      bgSound.pause();
    }
    if (e.target.classList.contains('sound-off')) {
      e.target.classList.add('d-none');
      e.target.previousElementSibling.classList.remove('d-none');
      bgSound.play();
    }
}

// Valid number on the DOM
function validNum(time, domElement) {
  domElement.textContent = `${
    time < 10 && time >= 0 ? `0${time}` : time < 0 ? '00' : time
  }`;
}

// Timer
function timer(time) {
  // Time Goal
  const timeGoal = new Date().getTime() + time;

  const counter = setInterval(() => {
    // Get current Time
    const currentTime = new Date().getTime();

    // Get time different
    const timeDifferent = timeGoal - currentTime;

    //Get minutes and seconds rest from time goal
    const minutes = Math.floor(timeDifferent / (1000 * 60));
    const seconds = Math.floor((timeDifferent % (1000 * 60)) / 1000);

    // Get DOM placeholders
    const domMinutes = document.querySelector('.timer .minutes'),
      domSeconds = document.querySelector('.timer .seconds');

    validNum(minutes, domMinutes);
    validNum(seconds, domSeconds);

    if (timeDifferent < 0) {
      clearInterval(counter);
      const correctCards = [...cards].filter(card => card.classList.contains('has-match'))
      if(correctCards.length === cards.length) {
         winActions()

      } else {
        winActions()
      }

      bgSound.pause();

      // Change Cards orders
      cards.forEach((card, index) => {
        shufle(orderRange);
        card.style.order = orderRange[index];
        card.classList.remove('has-match');
        card.classList.remove('flip');
      });
    }
  }, 500);
}

// Flip card
function flipCard(selectedCard) {
  // add a flip class to the selected card
  selectedCard.classList.add('flip');

  //Collect Flipped cards
  let allFlippedCards = [...cards].filter((flippedCard) =>
    flippedCard.classList.contains('flip')
  );

  if (allFlippedCards.length === 2) {
    checkMatchedCard(allFlippedCards[1], allFlippedCards[0]);

    //Stop Clicking
    stopClicking();
  }
}

//Stop Clicking Function
function stopClicking() {
  // Add class no clicking on cradsContainer
  cardsContainer.classList.add('no-click');

  setTimeout(() => {
    // Remove class no clicking on cradsContainer
    cardsContainer.classList.remove('no-click');
  }, 1000);
}

// Check matched Cards
function checkMatchedCard(firstCard, secondCard) {
  if (firstCard.dataset.tech === secondCard.dataset.tech) {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    firstCard.classList.add('has-match');
    secondCard.classList.add('has-match');
    succesSound.play();
  } else {
    userTries.innerText = parseInt(userTries.innerText) + 1;

    loseSound.play();
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
    }, 500);
  }
}

// Start Function
function startBtnHandler() {
  

  // Hide modal
  modal.classList.add('d-none')

  // Get user input
  let yourName = prompt('enter your name');

  changeUserName(yourName);
}

// Change user name
function changeUserName(name) {
  // Set Timer
  const time = domTimer.dataset.time * 1;
  timer(time);

  const verfiyName =
    name === '' || !name ? `Guest${Math.trunc(Math.random() * 1010)}` : name;
  userName.textContent = verfiyName;

  // Add background sound
  bgSound.play();
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
