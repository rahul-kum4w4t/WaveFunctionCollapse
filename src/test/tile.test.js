import Tile from "../main/js/Tile.js";

describe("Tile object test cases", () => {

    it("(Positive) Tile object creation", () => {
        expect(() => new Tile("test_name", {}, [0, 1, 2, 3], 30, 30)).not.toThrow(Error);
        expect(() => new Tile("", {}, [0, 1, 2, 3], 30, 30)).not.toThrow(Error);
    });

    it("(Negative) Tile object creation", () => {
        expect(() => new Tile("test_name", null, [0, 1, 2, 3], 30, 30)).toThrow(Error);
        expect(() => new Tile("test_name", {}, [0, 1, 2], 30, 30)).toThrow(Error);
        expect(() => new Tile("test_name", {}, [0, 1, 2], 40)).toThrow(Error);
        expect(() => new Tile("test_name", {}, [0, 1, 2], 30, 0)).toThrow(Error);
    });

    it("(Positive) toString function", () => {
        let tile = new Tile("Tile_None", {}, [0, 1, 1, 0], 30, 30);
        expect(tile.toString()).toBe("  0\n0 + 1\n  1");
    });

    it("(Positive) toJSON function", () => {
        let tile = new Tile("Tile_None", {}, [0, 1, 1, 0], 30, 30);
        expect(tile.toJSON()).toBe("Tile_None");
    });

    it("(Positive) isCompatible function", () => {
        let tile = new Tile("Tile_None", {}, [1, 1, 1, 0], 30, 30);
        let tile2 = new Tile("Tile_", {}, [1, 0, 1, 0], 30, 30);
        expect(Tile.isCompatible(tile, 2, tile2)).toBe(true);
    });

    it("(Negative) isCompatible function", () => {
        let tile = new Tile("Tile_None", {}, [1, 1, 1, 0], 30, 30);
        let tile2 = new Tile("Tile_", {}, [0, 0, 1, 0], 30, 30);
        expect(Tile.isCompatible(tile, 2, tile2)).toBe(false);
    });
});
