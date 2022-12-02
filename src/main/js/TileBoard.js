import Tile from "./Tile.js";
import { shuffleArray } from "../../lib/arrayUtils.js";
import { getRandIntInRangeExcUpBound } from "../../lib/numbers.js";

const SHUFFLED_TILES_COUNT = 10;

/**
 * M x N board which holds all the tiles
 */
export default class TileBoard {

    /**
     * Constructor for TileBoard
     * @param {integer} width Width of board
     * @param {integer} height Height of Board
     * @param {string} imgNames All the image names
     * @param {object} imgObjs All the image objects
     * @param {array} imgSockets All the image sockets
     * @param {function} comparator comparator which compares any socket of two tiles
     */
    constructor(width, height, imgNames, imgObjs, imgSockets, comparator = Tile.isCompatible) {

        if (Number.isInteger(width) && Number.isInteger(height) && width > 0 && height > 0) {
            this.boardWidth = width;
            this.boardHeight = height;
        } else {
            throw new TypeError("width and height of the board must be integers and greater than 0");

        }

        if (Array.isArray(imgNames) && Array.isArray(imgObjs) && Array.isArray(imgSockets) && (imgNames.length == imgObjs.length && imgSockets.length)) {
            const tiles = [];
            for (let i = 0; i < imgNames.length; i++) {
                tiles.push(new Tile(imgNames[i], imgObjs[i], imgSockets[i]));
            }
            this.shuffledTiles = new Array(SHUFFLED_TILES_COUNT).fill(0).map(() => shuffleArray([...tiles]));
        } else {
            throw new TypeError("imagenames, imageobjects and imagesockets must be arrays and of equal length");
        }

        if (typeof (comparator) == "function") {
            this.comparator = comparator;
        } else {
            throw new TypeError("Comparator passed, must be a function");
        }

        this.board = new Array(height).fill(0).map(() => new Array(width).fill(null));
    }

    /**
     * Try to fit each tile on the board in recursive manner
     * @param {integer} r 
     * @param {integer} c 
     * @returns true/false
     */
    fixBoard(r = 0, c = 0) {
        let tiles = this.shuffledTiles[getRandIntInRangeExcUpBound(0, this.shuffledTiles.length)];
        for (let i = 0; i < tiles.length; i++) {
            if (this.isCompatible(r, c, tiles[i])) {
                this.board[r][c] = tiles[i];

                if (c + 1 < this.boardWidth && this.board[r][c + 1] == null) {
                    if (!this.fixBoard(r, c + 1)) {
                        this.board[r][c] = null;
                    } else {
                        return true;
                    }
                } else if (c - 1 >= 0 && this.board[r][c - 1] == null) {
                    if (!this.fixBoard(r, c - 1)) {
                        this.board[r][c] = null;
                    } else {
                        return true;
                    }
                } else if (r + 1 < this.boardHeight && this.board[r + 1][c] == null) {
                    if (!this.fixBoard(r + 1, c)) {
                        this.board[r][c] = null;
                    } else {
                        return true;
                    }
                } else if (r - 1 >= 0 && this.board[r - 1][c] == null) {
                    if (!this.fixBoard(r - 1, c)) {
                        this.board[r][c] = null;
                    } else {
                        return true;
                    }
                } else {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Checks compatibility of any tile on the given spot
     * @param {integer} r 
     * @param {integer} c 
     * @param {object} tile 
     * @returns true/false
     */
    isCompatible(r, c, tile) {

        return !(r + 1 < this.board.length && this.board[r + 1][c] != null && !this.comparator(tile, 2, this.board[r + 1][c])) &&
            !(c + 1 < this.board[r].length && this.board[r][c + 1] != null && !this.comparator(tile, 1, this.board[r][c + 1])) &&
            !(r - 1 >= 0 && this.board[r - 1][c] != null && !this.comparator(tile, 0, this.board[r - 1][c])) &&
            !(c - 1 >= 0 && this.board[r][c - 1] != null && !this.comparator(tile, 3, this.board[r][c - 1]));
    }


    /**
     * Draws tile images on the canvas
     */
    draw() {
        for (let i = 0; i < this.boardHeight; i++) {
            for (let j = 0; j < this.boardWidth; j++) {
                if (this.board[i][j]) {
                    image(this.board[i][j].imgObj, j * this.boardHeight, i * this.boardWidth, this.boardWidth, this.boardHeight);
                }
            }
        }
    }
}