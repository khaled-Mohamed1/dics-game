// Declaring  variables
var scores, roundScore, activePlayer, gamePlaying;

// start of the game 
init();

// the dice roll
document.querySelector('.btn-roll').addEventListener('click', function () {

  // Checking if the game is being played
  if (gamePlaying) {

    // 1. Create random numbers for the dices
    var dice1 = Math.floor(Math.random() * 6) + 1;

    // 2. Display the results
    document.getElementById('dice1').style.display = 'block';
    document.getElementById('dice1').src = 'dice-' + dice1 + '.png';
    
      // 3. Update the round score if the rolled number was not a 1 
      if(dice1 !== 1) {       
          // Add score if the dice number is different from 1
        roundScore += dice1;    
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
      } else {
        nextPlayer();
      }
  }

});


// accumulate points ('hold')
document.querySelector('.btn-hold').addEventListener('click', function () {

  if (gamePlaying) {

    // 1. setting the global score
    scores[activePlayer] += roundScore;

    // 2. Updating user interface)
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // 3. Checking if the winning score is 30 or specific  
    var input = document.getElementById('winningScore').value;
    var winningScore;

    if(input) {
      winningScore = input;
    } else {
      winningScore = 30;
    }

    // 4. Checking the win
    if (scores[activePlayer] >= winningScore) {

      // 5. Changing the name of the player to 'Winner!'
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';

      // 6. Hiding the dices
      document.getElementById('dice1').style.display = 'none';

      // 7. Adding the 'winner' class to the player
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');

      // 8. Removing the active player status from the winner 
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

      // 9. Changing the 'gamePlaying' variable to 'false' will stop the game
      gamePlaying = false;

    } else {
      nextPlayer();
    }
  }
});


// Restarting the game 
document.querySelector('.btn-new').addEventListener('click', init);

function init() {

  gamePlaying = true;

  // 1. Setting both scores back to 0
  scores = [0, 0];

  // 2. Setting the roundScore back to 0
  roundScore = 0;

  // 3. Setting the activePlayer back to being 'Player 1'
  activePlayer = 0;

  // 4. Hiding the dices
  document.getElementById('dice1').style.display = 'none';

  // 5. Setting the scores to 0 
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  // 6. Removing the 'winner status'
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  // 7. Removing the 'active status'
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  // 8. Make sure that the 'active status' from 'Player 2' is removed and given to 'Player 1'  
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');

}

//  next player
function nextPlayer() {

  // 1. It's the next player's turn if the dice number is 1
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

  // 2. Setting the roundScore
  roundScore = 0;

  // 3. Setting the current score
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  // 4. Adding the active class to the player who has the turn now
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  // 5. Hiding the dice after the active player changes 
  document.getElementById('dice1').style.display = 'none';
}