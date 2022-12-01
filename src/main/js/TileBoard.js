import Tile from "./Tile.js";
import { shuffleArray } from "../../lib/arrayUtils.js";
import { getRandIntInRangeExcUpBound } from "../../lib/numbers.js";

export default class TileBoard {

    constructor(width, height, imgNames, imgObjs, imgSockets, comparator = Tile.isCompatible) {

        const tiles = [];
        this.boardWidth = width;
        this.boardHeight = height;
        for (let i = 0; i < imgNames.length; i++) {
            tiles.push(new Tile(imgNames[i], imgObjs[i], imgSockets[i]));
        }
        this.shuffledTiles = new Array(10).fill(0).map(e => shuffleArray([...tiles]));
        this.board = new Array(height).fill(0).map(e => new Array(width).fill(null));
        this.comparator = comparator;
    }

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

    isCompatible(r, c, tile) {

        return !(r + 1 < this.board.length && this.board[r + 1][c] != null && !this.comparator(tile, 2, this.board[r + 1][c])) &&
            !(c + 1 < this.board[r].length && this.board[r][c + 1] != null && !this.comparator(tile, 1, this.board[r][c + 1])) &&
            !(r - 1 >= 0 && this.board[r - 1][c] != null && !this.comparator(tile, 0, this.board[r - 1][c])) &&
            !(c - 1 >= 0 && this.board[r][c - 1] != null && !this.comparator(tile, 3, this.board[r][c - 1]));
    }
}