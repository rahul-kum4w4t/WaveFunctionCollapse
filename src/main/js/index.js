import TileBoard from "./TileBoard.js";
let tileBoard = null;
let imgObjs = [];

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
const boardWidth = 50;
const boardheight = 25;


function preload() {
    for (let i = 0; i < IMAGE_NAMES.length; i++) {
        imgObjs.push(loadImage(`../resources/${IMAGE_NAMES[i]}.jpg`));
    }
    tileBoard = new TileBoard(boardWidth, boardheight, IMAGE_NAMES, imgObjs, IMAGE_SOCKETS);
}

function setup() {

    let c = createCanvas(windowWidth, windowHeight);
    tileBoard.fixBoard();
    background(200);

    for (let i = 0; i < tileBoard.board.length; i++) {
        for (let j = 0; j < tileBoard.board[0].length; j++) {
            if (tileBoard.board[i][j]) {
                image(tileBoard.board[i][j].imgObj, j * 25, i * 25, 25, 25);
            }
        }
    }
    //saveCanvas(c, 'myCanvas', 'jpg');
}

export {
    preload,
    setup
}