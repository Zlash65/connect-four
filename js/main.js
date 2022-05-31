function init() {

  const instructions = document.querySelectorAll('p, h3');
  const grid = document.querySelector('.grid');

  let squares = [];
  let circles = [];
  let playedCircles = [];

  let firstColumn = [];
  let secondColumn = [];
  let thirdColumn = [];
  let fourthColumn = [];
  let fifthColumn = [];
  let sixthColumn = [];
  let seventhColumn = [];
  let columns = [firstColumn, secondColumn, thirdColumn, fourthColumn, fifthColumn, sixthColumn, seventhColumn];
  const width = columns.length;

  const twoPlayer = document.querySelector('#player-two');
  let playerNaruto = true;
  let playSasuke = true;

  const resetButtonTwo = document.querySelector('#reset-player-two');

  // score count variables
  const scoreBoard = document.querySelector('#scoreboard');
  const spanNaruto = document.querySelector('#naruto-score');
  const spanSasuke = document.querySelector('#sasuke-score');
  let scoreNaruto = 0;
  let scoreSasuke = 0;

  // function that adds circle into the column array
  function addCircle(circle, circleIndex) {
    for (let i = 0; i <= columns.length; i++) {
      const column = columns[i];
      if (circleIndex % width === i) {
        column.push(circle);
      }
    }
  }

  // function to highlight column's circles when hovering over top circle
  function highlightColumn(circleChosen) {
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      if (column.includes(circleChosen)) {
        column.forEach(gridCircle => {
          gridCircle.classList.add('grid-circle-highlighted');
        })
      }
    }
  }

  // function to remove highlighted column's circles when not hovering
  function removeHighlightColumn() {
    let i = 0;
    while (i < columns.length) {
      columns[i].forEach(gridCircle => {
        gridCircle.classList.remove('grid-circle-highlighted');
      })
      i++
    }
  }

  // event listeners for top circles for 2 player mode
  function hoverChoicesTwoPlayer(circlesChoice) {
    circlesChoice.forEach(circleChosen => circleChosen.addEventListener('mouseenter', () => {
      circleChosen.classList.add((playerNaruto) ? 'naruto' : 'sasuke');
      highlightColumn(circleChosen);
    }))
    circlesChoice.forEach(circleChosen => circleChosen.addEventListener('mouseleave', () => {
      removeHighlightColumn();
      circleChosen.classList.remove('naruto');
      circleChosen.classList.remove('sasuke');
    }))
  }

  // hide top circles to end the game and force a restart
  function stopHoverChoices() {
    const circlesChoice = document.querySelectorAll('.grid-choice-circle');
    circlesChoice.forEach(circleChosen => circleChosen.style.visibility = 'hidden');
  }

  // function that increases Naruto's score
  function addNaruto() {
    scoreNaruto = scoreNaruto + 1;
    spanNaruto.innerHTML = scoreNaruto;

    setTimeout(() => {
      alert("Naruto won this round");
    }, 1000);
  }

  // function that increases Sasuke's score
  function addSasuke() {
    scoreSasuke = scoreSasuke + 1;
    spanSasuke.innerHTML = scoreSasuke;

    setTimeout(() => {
      alert("Sasuke won this round");
    }, 1000);
  }

  // function to check if the game is over and has someone won
  function checkForWin(player) {

    const inCheckCircle = playedCircles[0];
    const pickedIndex = parseInt(inCheckCircle.getAttribute('data-id'));
    const lCircle = circles[pickedIndex - 1];
    const llCircle = circles[pickedIndex - 2];
    const lllCircle = circles[pickedIndex - 3];
    const rCircle = circles[pickedIndex + 1];
    const rrCircle = circles[pickedIndex + 2];
    const rrrCircle = circles[pickedIndex + 3];
    const bCircle = circles[pickedIndex + width];
    const bbCircle = circles[pickedIndex + width * 2];
    const bbbCircle = circles[pickedIndex + width * 3];
    const blCircle = circles[pickedIndex - 1 + width];
    const blblCircle = circles[pickedIndex - 2 + width * 2];
    const blblblCircle = circles[pickedIndex - 3 + width * 3];
    const brCircle = circles[pickedIndex + 1 + width];
    const brbrCircle = circles[pickedIndex + 2 + width * 2];
    const brbrbrCircle = circles[pickedIndex + 3 + width * 3];
    const leftArray = [lCircle, llCircle, lllCircle];
    const rightArray = [rCircle, rrCircle, rrrCircle];
    const bottomArray = [bCircle, bbCircle, bbbCircle];
    const bottomRightArray = [brCircle, brbrCircle, brbrbrCircle];
    const bottomLeftArray = [blCircle, blblCircle, blblblCircle];
    const arrays = [leftArray, rightArray, bottomArray, bottomRightArray, bottomLeftArray];

    let winningClass = '';
    if (player === 'naruto') {
      winningClass = 'naruto-circles';
    } else {
      winningClass = 'sasuke-circles';
    }

    for (let i = 0; i < arrays.length; i++) {
      if (arrays[i][0] !== undefined && arrays[i][0].classList.contains(player)) {
        if (arrays[i][1] !== undefined && arrays[i][1].classList.contains(player)) {
          if (arrays[i][2] !== undefined && arrays[i][2].classList.contains(player)) {
            inCheckCircle.classList.add(winningClass);
            arrays[i][0].classList.add(winningClass);
            arrays[i][1].classList.add(winningClass);
            arrays[i][2].classList.add(winningClass);
            if (player === 'naruto') {
              playSasuke = false
              addNaruto();
            } else {
              addSasuke();
            }
            stopHoverChoices();
          }
        }
      }
    }
  }

  // logic for the two players mode
  function playTwo(circleIndex) {

    const availableOne = firstColumn.length - 1;
    const availableTwo = secondColumn.length - 1;
    const availableThird = thirdColumn.length - 1;
    const availableFour = fourthColumn.length - 1;
    const availableFive = fifthColumn.length - 1;
    const availableSix = sixthColumn.length - 1;
    const availableSeven = seventhColumn.length - 1;
    const availableArray = [availableOne, availableTwo, availableThird, availableFour, availableFive, availableSix, availableSeven];

    for (let i = 0; i < width; i++) {
      const column = columns[i];
      let available = availableArray[i];
      if (circleIndex === i) {
        if (playerNaruto) {
          column[available].classList.add('naruto');
          playedCircles.unshift(column[available]);
          checkForWin('naruto');
        } else {
          column[available].classList.add('sasuke');
          playedCircles.unshift(column[available]);
          checkForWin('sasuke');
        }

        column.pop();
        available = column.length - 1;
      }
    }

    playerNaruto = !playerNaruto;
  }

  function playChoiceTwoPlayer(circle, circleIndex) {
    circle.addEventListener('click', () => playTwo(circleIndex));
  }

  // function to create top row with hover capability for playing the game
  function drawTopRow(circle, circleIndex) {
    if (circleIndex < width) {
      circle.classList.remove('grid-circle');
      circle.classList.add('grid-choice-circle');
      const circlesChoice = document.querySelectorAll('.grid-choice-circle');

      hoverChoicesTwoPlayer(circlesChoice);
      playChoiceTwoPlayer(circle, circleIndex);
    }
  }

  // function to draw the circles on the grid dialog box for the game
  function drawBoard() {
    for (var i = 0; i < width * width; i++) {
      const square = document.createElement('div');
      const circle = document.createElement('div');

      square.classList.add('grid-square');
      square.style.display = 'block';

      circle.classList.add('grid-circle');
      circle.style.display = 'block';
      circle.setAttribute('data-id', i);
      const circleIndex = parseInt(circle.getAttribute('data-id'));

      squares.push(square);
      circles.push(circle);
      grid.appendChild(square);
      square.appendChild(circle);

      addCircle(circle, circleIndex);
      drawTopRow(circle, circleIndex);
    }
  }

  // function to reset the grid for a new game
  function clearBoard() {
    playedCircles.forEach(playedCircle => {
      playedCircle.classList.remove('naruto');
      playedCircle.classList.remove('sasuke');
      playedCircle.classList.remove('naruto-circles');
      playedCircle.classList.remove('sasuke-circles');
    });

    squares = [];
    circles = [];
    firstColumn = [];
    secondColumn = [];
    thirdColumn = [];
    fourthColumn = [];
    fifthColumn = [];
    sixthColumn = [];
    seventhColumn = [];
    columns = [firstColumn, secondColumn, thirdColumn, fourthColumn, fifthColumn, sixthColumn, seventhColumn];
    playedCircles = [];
    grid.innerHTML = '';
    drawBoard();
  }

  // function that clears the instructions screen from the grid dialog box
  function clearInstructions() {
    twoPlayer.style.display = 'none';
    scoreBoard.style.visibility = 'visible';
    resetButtonTwo.style.visibility = 'visible';
    instructions.forEach(instruction => {
      instruction.style.display = 'none'
    });

    drawBoard();
  }

  // clear instructions from grid dialog box and starts the game in 2 player mode
  twoPlayer.addEventListener('click', () => {
    clearInstructions();
  })

  // clears the grid and restarts the game in 2 player mode
  resetButtonTwo.addEventListener('click', () => {
    clearBoard();
  });
}

window.addEventListener('DOMContentLoaded', init)
