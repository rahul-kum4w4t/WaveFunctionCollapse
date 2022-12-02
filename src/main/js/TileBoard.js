import Tile from "./Tile.js";
import { shuffleArray } from "../../lib/arrayUtils.js";
import { getRandIntInRangeExcUpBound } from "../../lib/numbers.js";

/**
 * M x N board which holds all the tiles
 */
export default class TileBoard {

    /**
     * Constructor for TileBoard
     * @param {integer} width Width of board
     * @param {integer} height Height of Board
     * @param {string} imgNames All the image names
     * @param {object} imageObjects All the image objects
     * @param {array} imgSockets All the image sockets
     * @param {function} comparator comparator which compares any socket of two tiles
     */
    constructor({ boardWidth, boardHeight, tileWidth, tileHeight, imageNames, imageObjects, imageSockets, comparator = Tile.isCompatible }) {

        if (
            Number.isInteger(boardWidth) && Number.isInteger(boardHeight) && Number.isInteger(tileWidth) && Number.isInteger(tileHeight) &&
            boardWidth > 0 && boardHeight > 0 && tileWidth > 0 && tileHeight > 0
        ) {
            this.boardWidth = boardWidth;
            this.boardHeight = boardHeight;
            this.tileWidth = tileWidth;
            this.tileHeight = tileHeight;
        } else {
            throw new TypeError("width and height of the board and tiles must be integers and greater than 0");
        }

        if (
            Array.isArray(imageNames) && Array.isArray(imageObjects) && Array.isArray(imageSockets) &&
            (imageNames.length == imageObjects.length) && (imageNames.length == imageSockets.length) &&
            imageNames.length > 0
        ) {
            const tiles = [];
            for (let i = 0; i < imageNames.length; i++) {
                tiles.push(new Tile(imageNames[i], imageObjects[i], imageSockets[i]));
            }
            this.distinctTilesCount = imageNames.length;
            this.shuffledTiles = new Array(this.distinctTilesCount > 1 && this.distinctTilesCount <= 10 ? this.distinctTilesCount : 10).fill(0).map(() => shuffleArray([...tiles]));
        } else {
            throw new TypeError("imagenames, imageobjects and imagesockets must be arrays and of equal length");
        }

        if (typeof (comparator) == "function") {
            this.comparator = comparator;
        } else {
            throw new TypeError("Comparator passed, must be a function");
        }

        this.board = new Array(this.boardHeight).fill(0).map(() => new Array(this.boardWidth).fill(null));
    }

    /**
     * Try to fit each tile on the board in recursive manner
     */
    fixBoard() {

        const stack = [];
        let isNotComplete = true;
        let r = 0;
        let c = 0;
        let i = 0;
        let tiles = this.shuffledTiles[0];

        while (isNotComplete) {
            while (i < this.distinctTilesCount) {
                if (this.isCompatible(r, c, tiles[i])) {
                    this.board[r][c] = tiles[i];
                    stack.push([r, c, tiles, i]);
                    i = 0;
                    tiles = this.shuffledTiles[getRandIntInRangeExcUpBound(0, this.shuffledTiles.length)];

                    if (c + 1 < this.boardWidth && this.board[r][c + 1] == null) {
                        c++;
                    } else if (c - 1 >= 0 && this.board[r][c - 1] == null) {
                        c--;
                    } else if (r + 1 < this.boardHeight && this.board[r + 1][c] == null) {
                        r++;
                    } else if (r - 1 >= 0 && this.board[r - 1][c] == null) {
                        r--;
                    } else {
                        isNotComplete = false;
                    }
                } else {
                    i++;
                }
            }
            if (isNotComplete && i == this.distinctTilesCount) {
                [r, c, tiles, i] = stack.pop();
                this.board[r][c] = null;
                i++;
            }
        }
    }

    /**
     * Checks compatibility of any tile on the given spot
     * @param {integer} r 
     * @param {integer} c 
     * @param {object} tile 
     * @returns true/false
     */
    isCompatible(r, c, tile) {

        return this.board[r][c] == null &&
            !(r + 1 < this.boardHeight && this.board[r + 1][c] != null && !this.comparator(tile, 2, this.board[r + 1][c])) &&
            !(c + 1 < this.boardWidth && this.board[r][c + 1] != null && !this.comparator(tile, 1, this.board[r][c + 1])) &&
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
                    image(this.board[i][j].imgObj, j * this.tileWidth, i * this.tileHeight, this.tileWidth, this.tileHeight);
                }
            }
        }
    }
}