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
let boardHeight = 0;//  (will fit to entire screen height)


// Preload images and save in array
function preload() {
    for (let i = 0; i < IMAGE_NAMES.length; i++) {
        imgObjs.push(loadImage(`../resources/${IMAGE_NAMES[i]}.jpg`));
    }
    // Adjusting board width and height according to screen width and height
    boardWidth = Math.ceil(windowWidth / tileWidth);
    boardHeight = Math.ceil(windowHeight / tileHeight);
    tileBoard = new TileBoard({
        boardWidth,
        boardHeight,
        tileWidth,
        tileHeight,
        imageNames: IMAGE_NAMES,
        imageObjects: imgObjs,
        imageSockets: IMAGE_SOCKETS
    });
}

// Canvas method for setting up the view
function setup() {
    let c = createCanvas(windowWidth, windowHeight);
    background(200);
    tileBoard.fixBoard();
    console.log(JSON.stringify(tileBoard));
    tileBoard.draw();
    //saveCanvas(c, 'myCanvas', 'jpg');
}

// Exports
export {
    preload,
    setup
}