import Tile from "../main/js/Tile.js";
import TileBoard from "../main/js/TileBoard.js";

// Change as per requirement
const configObject = {
    boardWidth: 5,
    boardHeight: 5,
    tileWidth: 25,
    tileHeight: 25,
    imageNames: ["tile_none", "tile_rdl"],
    imageObjects: [{}, {}],
    imageSockets: [
        [0, 0, 0, 0],
        [0, 1, 1, 1]
    ]
}

describe("TileBoard object test cases", () => {

    it("(Positive) TileBoard object creation", () => {
        expect(() => new TileBoard(configObject)).not.toThrow(Error);
    });

    it("(Negative) TileBoard object creation", () => {
        expect(() => new TileBoard({ ...configObject, boardWidth: 0 })).toThrow(Error);
        expect(() => new TileBoard({ ...configObject, boardHeight: "boardHeight" })).toThrow(Error);
        expect(() => new TileBoard({ ...configObject, boardWidth: 1.20 })).toThrow(Error);
        expect(() => new TileBoard({ ...configObject, imageNames: null })).toThrow(Error);
        expect(() => new TileBoard({ ...configObject, imageObjects: [] })).toThrow(Error);
        expect(() => new TileBoard({ ...configObject, comparator: null })).toThrow(Error);
    });

    it("(Positive) Properties setting after TileBoard object creation", () => {
        let tileBoard = new TileBoard(configObject);
        expect(tileBoard).toHaveProperty('boardWidth', configObject.boardWidth);
        expect(tileBoard).toHaveProperty('boardHeight', configObject.boardHeight);
        expect(tileBoard).toHaveProperty('tileWidth', configObject.tileWidth);
        expect(tileBoard).toHaveProperty('tileHeight', configObject.tileHeight);
        expect(tileBoard).toHaveProperty('shuffledTiles');
        expect(tileBoard).toHaveProperty('comparator', Tile.isCompatible);
        expect(tileBoard).toHaveProperty('distinctTilesCount', 2);
        expect(tileBoard).toHaveProperty('board', new Array(configObject.boardHeight).fill(0).map(() => new Array(configObject.boardWidth).fill(null)));
    });

    it("(Positive) 'fixBoard' method", () => {
        let tileBoard = new TileBoard(configObject);
        tileBoard.fixBoard();
        for (let rowArr of tileBoard.board) {
            for (let tile of rowArr) {
                expect(tile).toBeInstanceOf(Tile);
            }
        }
    });
});
