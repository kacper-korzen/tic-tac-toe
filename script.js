const Game = (function () {
  // State elements
  let gameboard = createGameboardArray();
  let playingSymbol = 'b';
  let winner = '';

  const player1 = createPlayer("", "");
  const player2 = createPlayer("", "");
  

  // DOM elements
  const startGameSection = document.querySelector(".startGame");
  const wrapper = document.querySelector(".wrapper");
  const startBtn = document.querySelector("#startGame");
  const players = document.querySelectorAll(".player");
  const charactersTitle = document.querySelectorAll(".characters > h4");
  const characterAvatars = document.querySelectorAll(".characters > div");
  const winComunicat = document.querySelector(".winingMessage > h2");

  // Images
  let bambooImg = "<img src='img/bamboo.png' alt='bamboo icon'>";
  let meatImg = "<img src='img/meat.png' alt='meat icon'>";
  const backgrounds = ['img/start-pattern.png', 'img/cats-won-pattern.png', 'img/bears-won-pattern.png'];

  function checkGameState() {
    let message = '';
    if (winner === 'm') {
      changeBackground(backgrounds[1]);
      message = `${player1.name} won!`;
      createWinningComunicat(message);
    } else if (winner === 'b') {
      changeBackground(backgrounds[2]);
      message = `${player2.name} won!`;
      createWinningComunicat(message);
    } else if (checkIfFull()) {
      winner = 'd';
      message = "It's a draw!";
      createWinningComunicat(message);
    }
  }

  function createGameboardArray() {
    const gameboard = Array.from({ length: 9 }, (_, i) => 0);

    return gameboard;
  }

  function changeBackground(newImage) {
    wrapper.style.backgroundImage = `url(${newImage})`;
  }
  function checkIfFull() {
    if (gameboard.includes(0)) {
      console.log("not full");
      return false;
    } else {
      console.log("full");
      return true;
    }
  }

  function didSymbolWin(symbol) {
    // 1, 5, 9
    // 3, 5, 7
    // 3 in row
    if (
      gameboard[0] === symbol &&
      gameboard[4] === symbol &&
      gameboard[8] === symbol
    ) {
      winner = symbol;
      
    }

    if (
      gameboard[2] === symbol &&
      gameboard[4] === symbol &&
      gameboard[6] === symbol
    ) {
      winner = symbol;
    }

    let len = 0;
    for (let val of gameboard) {
      if (val === symbol) {
        len += 1;
        if (len == 3) {
          winner = symbol;
        }
      } else {
        len = 0;
      }
    }

    for (let col = 0; col < 3; col++) {
      if (gameboard[col] === symbol && 
          gameboard[col + 3] === symbol && 
          gameboard[col + 6] === symbol) {
        winner = symbol;
      }
  }

  }

  function createPlayer(name, symbol) {
    return { name, symbol };
  }

  function getPlayerInfo() {
    player1.name = players[0].querySelector("input").value;
    player2.name = players[1].querySelector("input").value;
    console.log(player1.name, player2.name);
    disablePlayerInput();
  }

  function disableAvatarSelection() {
    charactersTitle[0].textContent = "Your character";
    charactersTitle[1].textContent = "Your character";

    for (let avatar of characterAvatars) {
      if (!avatar.querySelector("input").checked) {
        console.log(avatar);
        avatar.remove();    
      } 
    }
  }

  function disablePlayerInput() {
    players[0].querySelector("input").disabled = true;
    players[1].querySelector("input").disabled = true;
    disableAvatarSelection();
  }
  
  function createWinningComunicat(comunicat) {
    winComunicat.textContent = comunicat;    
  }

  function createOneSquare() {
    const square = document.createElement("div");
    square.classList.add("square");
    
    const clickHandler = function()  {
      if (playingSymbol === 'b' && gameboard[square.id] === 0 && winner === '') {
        gameboard[square.id] = 'm';
        square.innerHTML = meatImg;
        playingSymbol = 'm';
        didSymbolWin('m'); 
        checkGameState();
      } else if (playingSymbol === 'm' && gameboard[square.id] === 0 && winner === '') {
        gameboard[square.id] = 'b';
        square.innerHTML = bambooImg;
        playingSymbol = 'b';
        didSymbolWin('b'); 
        checkGameState();
      }
    };

    square.addEventListener("click", clickHandler); 

    return square;
  }
  function createGameboard() {
    for( let i = 0; i < 9; i++) {
      let square = createOneSquare();
      square.id = i;
      startGameSection.appendChild(square);
    }
  }

  function startNewGame() {
    gameboard = createGameboardArray();
    
    startBtn.addEventListener("click", () => {
      startGameSection.classList.remove("startGame");
      startGameSection.innerHTML = "";
      startGameSection.classList.add("gameboard");
      createGameboard();
      getPlayerInfo();
    });

  }

  startNewGame();

  return {
    createGameboard,
    createPlayer,
    didSymbolWin,
  };

})();
