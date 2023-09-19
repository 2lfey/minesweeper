const squareSize = 8
const bombCount = 9

const root = document.querySelector('.grid')

const createItem = (isBomb) => {
    const el = document.createElement(
        'div'
    )

    el.className = "h-6 w-6 bg-gray-400 border-2 border-gray-600 flex justify-center items-center select-none text-transparent"
    el.addEventListener('click', e => {
        el.classList.remove('text-transparent')
    })
    el.setCount = (count) => {
        el.innerHTML = count
    }

    el.isBomb = isBomb
    if (isBomb) {
        el.innerHTML = "X"
    }

    return el
}

const grid = []

let currentBombCount = 0

const isBomb = () => currentBombCount <= bombCount && Boolean(Math.round(Math.random()))

// Fill grid
for (let i = 0; i < squareSize; i++) {
    const arr = []

    for (let j = 0; j < squareSize; j++) {
        const _isBomb = isBomb()
        if (_isBomb) {
            arr[j] = createItem(_isBomb)
            currentBombCount++
        } else {
            arr[j] = createItem(_isBomb)
        }

        root.appendChild(arr[j])
    }

    grid[i] = arr
}

// Calc empties

for (let y = 0; y < squareSize; y++) {
    const arr = grid[y]

    for (let x = 0; x < squareSize; x++) {
        const el = arr[x]
        if (el?.isBomb) {
            continue
        }

        let count = 0
        // left
        if (x > 0) {
            count = grid[y][x-1].isBomb ? count + 1 : count
        }

        // top
        if (y > 0) {
            count = grid[y - 1][x].isBomb ? count + 1 : count
        }

        // right
        if (x < squareSize - 1) {
            count = grid[y][x + 1].isBomb ? count + 1 : count
        }

        // bottom
        if (y < squareSize - 1) {
            count = grid[y + 1][x].isBomb ? count + 1 : count
        }

        // left top
        if (y > 0 && x > 0) {
            count = grid[y - 1][x - 1].isBomb ? count + 1 : count
        }

        // right top
        if (x < squareSize - 1 && y > 0) {
            count = grid[y - 1][x + 1].isBomb ? count + 1 : count
        }

        // right bottom
        if (y < squareSize - 1 && x < squareSize - 1) {
            count = grid[y + 1][x + 1].isBomb ? count + 1 : count
        }

        // left bottom
        if (y < squareSize - 1 && x > 0) {
            count = grid[y + 1][x - 1].isBomb ? count + 1 : count
        }

        if (count !== 0) {
            el.setCount(count)
        }

        count = 0
    }
}
