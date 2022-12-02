import TileBoard from "./TileBoard.js";

// Change as per requirement
const IMAGE_NAMES = ["tile_none", "tile_rdl", "tile_rl", "tile_ud", "tile_uld", "tile_urd", "tile_url", "tile_plus"];
const IMAGE_SOCKETS = [
    [0, 0, 0, 0],
    [0, 1, 1, 1],
    [0, 1, 0, 1],
    [1, 0, 1, 0],
    [1, 0, 1, 1],
    [1, 1, 1, 0],
    [1, 1, 0, 1],
    [1, 1, 1, 1]
];
const tileWidth = 25;
const tileHeight = 25;


// Do not change
let tileBoard = null;
const imgObjs = [];
let boardWidth = 0; // (will fit to entire screen width)
let boardheight = 0;//  (will fit to entire screen height)


// Preload images and save in array
function preload() {
    for (let i = 0; i < IMAGE_NAMES.length; i++) {
        imgObjs.push(loadImage(`../resources/${IMAGE_NAMES[i]}.jpg`));
    }
    // Adjusting board width and height according to screen width and height
    boardWidth = Math.ceil(windowWidth / tileWidth);
    boardheight = Math.ceil(windowHeight / tileHeight);
    tileBoard = new TileBoard(boardWidth, boardheight, IMAGE_NAMES, imgObjs, IMAGE_SOCKETS);
}

// Canvas method for setting up the view
function setup() {

    let c = createCanvas(windowWidth, windowHeight);
    tileBoard.fixBoard();
    background(200);

    for (let i = 0; i < boardheight; i++) {
        for (let j = 0; j < boardWidth; j++) {
            if (tileBoard.board[i][j]) {
                image(tileBoard.board[i][j].imgObj, j * tileHeight, i * tileWidth, tileWidth, tileHeight);
            }
        }
    }
    //saveCanvas(c, 'myCanvas', 'jpg');
}

// Exports
export {
    preload,
    setup
}