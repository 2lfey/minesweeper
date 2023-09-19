// Default config
const defaultSquareSize = 10;
const defaultBombCount = 20;

// Views
const root = document.querySelector("#root");
const restartBtn = document.querySelector("#restartBtn");
const sizeInp = document.querySelector("#sizeInp");
const bombCountInp = document.querySelector("#bombCountInp");

// Global vars
let squareSize = defaultSquareSize;
let bombCount = defaultBombCount;
let grid = [];
let currentBombCount = 0;

const main = () => {
  restartBtn.addEventListener("click", (e) => start());
  sizeInp.addEventListener("change", (e) => {
    squareSize = e.currentTarget.value || defaultSquareSize;
    root.style.gridTemplateColumns = `repeat(${squareSize}, minmax(0, 1fr))`;
  });

  bombCountInp.addEventListener("change", (e) => {
    bombCount = e.currentTarget.value || defaultBombCount;
  });

  root.style.gridTemplateColumns = `repeat(${squareSize}, minmax(0, 1fr))`;

  start();
};

const start = () => {
  if (grid.length !== 0) {
    grid = clearGrid();
  }

  root.className = `grid`;
  

  root.innerHTML = "";
  currentBombCount = 0;

  grid = fillGrid();
  grid = calcBounds(grid);
};

// Bomb function generation
const isBomb = () => {
  if (currentBombCount === bombCount) {
    return false;
  }

  const rand = Math.random();

  return rand < 0.1 || rand > 0.9;
};

const createItem = (isBomb) => {
  const el = document.createElement("div");

  el.isShow = false;
  el.isBomb = isBomb;
  if (isBomb) {
    el.innerHTML = "X";
  }

  el.show = () => {
    el.classList.remove("text-transparent");
    el.classList.add(el.isBomb ? "bg-red-500" : "bg-gray-500");
  };

  el.clickHandler = () => {
    if (el.isBomb) {
      showBombs();
      return;
    }
    el.show();
  };

  el.className =
    "h-6 w-6 bg-gray-400 border border-black/20 flex justify-center items-center select-none text-transparent";
  el.addEventListener("click", el.clickHandler);
  el.setCount = (count) => {
    el.innerHTML = count;
  };

  return el;
};

const fillGrid = (grid = []) => {
  for (let i = 0; i < squareSize; i++) {
    const arr = [];

    for (let j = 0; j < squareSize; j++) {
      const _isBomb = isBomb();

      arr[j] = createItem(_isBomb);

      if (_isBomb) {
        currentBombCount++;
      }

      root.appendChild(arr[j]);
    }

    grid[i] = arr;
  }

  return grid;
};

const calcBounds = (grid) => {
  // Calc empties
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid.length; x++) {
      if (grid[y][x]?.isBomb) {
        continue;
      }

      let count = 0;
      // left
      if (x > 0) {
        count = grid[y][x - 1].isBomb ? count + 1 : count;
      }

      // top
      if (y > 0) {
        count = grid[y - 1][x].isBomb ? count + 1 : count;
      }

      // right
      if (x < grid.length - 1) {
        count = grid[y][x + 1].isBomb ? count + 1 : count;
      }

      // bottom
      if (y < grid.length - 1) {
        count = grid[y + 1][x].isBomb ? count + 1 : count;
      }

      // left top
      if (y > 0 && x > 0) {
        count = grid[y - 1][x - 1].isBomb ? count + 1 : count;
      }

      // right top
      if (x < grid.length - 1 && y > 0) {
        count = grid[y - 1][x + 1].isBomb ? count + 1 : count;
      }

      // right bottom
      if (y < grid.length - 1 && x < grid.length - 1) {
        count = grid[y + 1][x + 1].isBomb ? count + 1 : count;
      }

      // left bottom
      if (y < grid.length - 1 && x > 0) {
        count = grid[y + 1][x - 1].isBomb ? count + 1 : count;
      }

      if (count !== 0) {
        grid[y][x].setCount(count);
      }

      count = 0;
    }
  }

  return grid;
};

const clearGrid = () => {
  grid.forEach((row) => {
    row.forEach((el) => {
      el.removeEventListener("click", el.clickHandler);
    });
  });

  return [];
};

const showBombs = () => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid.length; x++) {
      if (!grid[y][x].isShow) {
        grid[y][x].show();
      }
    }
  }
};

main();
