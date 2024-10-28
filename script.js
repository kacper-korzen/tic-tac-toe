const Game = (function () {
  // State elements
  let gameboard = createGameboardArray();
  let playingSymbol = 'b';
  let winner = '';

  // DOM elements
  const gameboardDiv = document.querySelector(".gameboard");
  const wrapper = document.querySelector(".wrapper");

  // Images
  let bambooImg = "<img src='img/bamboo.png' alt='bamboo icon'>";
  let meatImg = "<img src='img/meat.png' alt='meat icon'>";
  const backgrounds = ['img/start-pattern.png', 'img/cats-won-pattern.png', 'img/bears-won-pattern.png'];

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
      return true;
    }

    if (
      gameboard[2] === symbol &&
      gameboard[4] === symbol &&
      gameboard[6] === symbol
    ) {
      winner = symbol;
      return true;
    }

    let len = 0;
    for (let val of gameboard) {
      if (val === symbol) {
        len += 1;
        if (len == 3) {
          winner = symbol;
          return true;
        }
      } else {
        len = 0;
      }
    }

    return false;
  }

  function createPlayer(name, symbol) {
    return { name, symbol };
  }

  function createOneSquare() {
    const square = document.createElement("div");
    square.classList.add("square");
    
    square.addEventListener("click", () => {
      if (playingSymbol === 'b' && gameboard[square.id] === 0) {
        gameboard[square.id] = 'm';
        square.innerHTML = meatImg;
        playingSymbol = 'm';
        didSymbolWin('m');
        checkIfFull();
      } else if (playingSymbol === 'm' && gameboard[square.id] === 0) {
        gameboard[square.id] = 'b';
        square.innerHTML = bambooImg;
        playingSymbol = 'b';
        checkIfFull();
        didSymbolWin('b');
      }
    });

    return square;
  }
  function createGameboard() {
    for( let i = 0; i < 9; i++) {
      let square = createOneSquare();
      square.id = i;
      gameboardDiv.appendChild(square);
    }
  }

  createGameboard();

  return {
    createGameboard,
    createPlayer,
    didSymbolWin,
  };

})();
