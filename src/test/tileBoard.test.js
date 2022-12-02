import Tile from "../main/js/Tile.js";
import TileBoard from "../main/js/TileBoard.js";


// Change as per requirement
const IMAGE_NAMES = ["tile_none", "tile_rdl"];
const IMAGE_SOCKETS = [
    [0, 0, 0, 0],
    [0, 1, 1, 1]
];
const imgObjs = [{}, {}];
let boardWidth = 5;
let boardheight = 5;

describe("TileBoard object test cases", () => {

    it("(Positive) TileBoard object creation", () => {
        expect(() => new TileBoard(boardWidth, boardheight, IMAGE_NAMES, imgObjs, IMAGE_SOCKETS)).not.toThrow(Error);
    });

    it("(Negative) TileBoard object creation", () => {
        expect(() => new TileBoard(0, boardheight, IMAGE_NAMES, imgObjs, IMAGE_SOCKETS)).toThrow(Error);
        expect(() => new TileBoard(boardWidth, "boardHeight", IMAGE_NAMES, imgObjs, IMAGE_SOCKETS)).toThrow(Error);
        expect(() => new TileBoard(1.12, "boardHeight", IMAGE_NAMES, imgObjs, IMAGE_SOCKETS)).toThrow(Error);
        expect(() => new TileBoard(boardWidth, boardheight, null, imgObjs, IMAGE_SOCKETS)).toThrow(Error);
        expect(() => new TileBoard(boardWidth, boardheight, IMAGE_NAMES, [], IMAGE_SOCKETS)).toThrow(Error);
        expect(() => new TileBoard(boardWidth, boardheight, IMAGE_NAMES, imgObjs, IMAGE_SOCKETS, null)).toThrow(Error);
    });

    it("(Positive) Properties setting after TileBoard object creation", () => {
        let tileBoard = new TileBoard(2, 2, IMAGE_NAMES, imgObjs, IMAGE_SOCKETS);
        expect(tileBoard).toHaveProperty('boardWidth', 2);
        expect(tileBoard).toHaveProperty('boardHeight', 2);
        expect(tileBoard).toHaveProperty('shuffledTiles');
        expect(tileBoard).toHaveProperty('comparator', Tile.isCompatible);
        expect(tileBoard).toHaveProperty('board', new Array(2).fill(0).map(() => new Array(2).fill(null)));
    });

    it("(Positive) 'fillBoard' method", () => {
        let tileBoard = new TileBoard(2, 2, IMAGE_NAMES, imgObjs, IMAGE_SOCKETS);
        expect(tileBoard.fixBoard()).toBe(true);
    });
});
