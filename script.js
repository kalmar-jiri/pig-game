'use strict';

// ---------- SELECTING ELEMENTS ---------- //
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// ---------- VARIABLES INITIALIZATION ---------- //
let scores, currentScore, activePlayer, playing;

// ---------- FUNCTIONS ---------- //
const swtichPlayer = () => {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const newGame = () => {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  btnNew.classList.remove('new--end');

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
};

// ---------- START THE GAME ---------- //
newGame();

// ---------- EVENTS ---------- //
// Rolling the dice
btnRoll.addEventListener('click', () => {
  if (playing) {
    // Random dice roll
    const dice = Math.trunc(Math.random() * 6 + 1);

    // Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // Check if rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      swtichPlayer();
    }
  }
});

// Holding
btnHold.addEventListener('click', () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 20) {
      // Win the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
      btnNew.classList.add('new--end');
    } else {
      swtichPlayer();
    }
  }
});

// New game
btnNew.addEventListener('click', newGame);
