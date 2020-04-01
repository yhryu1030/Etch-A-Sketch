let defaultRow = 16;
let defaultCol = 16;

const grid = document.querySelector(".grid");
const button = document.querySelector(".newGrid");

// button.addEventListener('click', refreshGrid);

// default
createGrid(defaultRow, defaultCol);

// builds a grid in the container
function createGrid(numRow, numCol) {
    grid.style.gridTemplateRows = "repeat(" + numRow + ", minmax(" + grid.clientWidth/numRow + "px, 1fr))";
    grid.style.gridTemplateColumns = "repeat(" + numCol + ", minmax(" + grid.clientHeight/numCol + "px, 1fr))";

    for (let r=1; r <= numRow; r++) {
        for (let c=1; c <= numCol; c++) {
            let gridSquare = document.createElement("div");
            gridSquare.setAttribute("grid-col", c);
            gridSquare.setAttribute("grid-row", r);
            gridSquare.classList.add('grid-square');
            gridSquare.addEventListener('mouseover', onMouseOver);
            gridSquare.dataset.mouseoverPasses = 0;
            grid.appendChild(gridSquare);
        }
    }
}

// change color of grid when mouse hovers
function onMouseOver(e) {
    let gridSquare = e.target;
    let mouseoverPasses = Number(gridSquare.dataset.mouseoverPasses);

    if (mouseoverPasses == 0) {
        let red = randomColor();
        gridSquare.dataset.originalRed = red;
        let green = randomColor();
        gridSquare.dataset.originalGreen = green;
        let blue = randomColor();
        gridSquare.dataset.originalBlue = blue;

        gridSquare.style.backgroundColor = getRGB(red, green, blue);
        gridSquare.dataset.mouseoverPasses = mouseoverPasses + 1;
    }
    else if (mouseoverPasses == 10) {
        gridSquare.style.backgroundColor = getRGB(0,0,0);
    }
    else if (mouseoverPasses < 10) {
        let originalRed = Number(gridSquare.dataset.originalRed);
        let originalGreen = Number(gridSquare.dataset.originalGreen);
        let originalBlue = Number(gridSquare.dataset.originalBlue);

        // Make 10% darker each time mouse hovers
        let newRed = originalRed - Math.floor((originalRed / 10) * mouseoverPasses);
        let newGreen = originalGreen - Math.floor((originalGreen / 10) * mouseoverPasses);
        let newBlue = originalBlue - Math.floor((originalBlue / 10) * mouseoverPasses);

        gridSquare.style.backgroundColor = getRGB(newRed, newGreen, newBlue);
        gridSquare.dataset.mouseoverPasses = mouseoverPasses + 1;
    }
}

function getRGB(red, green, blue) {
    return 'rgb(' + red + ',' + green + ',' + blue + ')';
}

function randomColor() {
    return Math.floor(Math.random() * 256);
}

