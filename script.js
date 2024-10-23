const Game = (function () {
  let gameboard = createGameboardArray();
  gameboard = [ 'x', 'x', 'x',
                'o', 'o', 'o',
                'o', 'o', 'o'];

  const gameboardDiv = document.querySelector(".gameboard");

  function createGameboardArray() {
    const gameboard = Array.from({ length: 9 }, (_, i) => 0);

    return gameboard;
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
      return true;
    }

    if (
      gameboard[2] === symbol &&
      gameboard[4] === symbol &&
      gameboard[6] === symbol
    ) {
      return true;
    }

    let len = 0;
    for (let val of gameboard) {
      if (val === symbol) {
        len += 1;
        if (len == 3) {
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
    return square;
  }
  function createGameboard() {
    for( let i = 0; i < 9; i++) {
      gameboardDiv.appendChild(createOneSquare());
    }
    return square;
  }

  createGameboard();

  return {
    createGameboard,
    createPlayer,
    didSymbolWin,
  };
})();
