import TileBoard from "./TileBoard.js";
import data from "./data.js";

// Change as per requirement
const tileWidth = 20;
const tileHeight = 20;
let tilesType = "maze";

// Do not change
let tileBoard = null;
const imgObjs = [];
let boardWidth = 0; // (will fit to entire screen width)
let boardHeight = 0;//  (will fit to entire screen height)


// Preload images and save in array
function preload() {
    const { imageNames, imageSockets, imgFileExt, comparator } = data[tilesType];

    for (let i = 0; i < imageNames.length; i++) {
        imgObjs.push(loadImage(`../resources/${tilesType}/${imageNames[i]}.${imgFileExt}`));
    }
    // Adjusting board width and height according to screen width and height
    boardWidth = Math.ceil(windowWidth / tileWidth);
    boardHeight = Math.ceil(windowHeight / tileHeight);
    console.log("Comparator: ",comparator);
    tileBoard = new TileBoard({
        boardWidth,
        boardHeight,
        tileWidth,
        tileHeight,
        imageNames,
        imageObjects: imgObjs,
        imageSockets,
        comparator
    });
}

// Canvas method for setting up the view
function setup() {
    let c = createCanvas(windowWidth, windowHeight);
    background(200);
    tileBoard.fixBoard();
    tileBoard.draw();
    //saveCanvas(c, 'myCanvas', 'jpg');
}

// Exports
export {
    preload,
    setup
}