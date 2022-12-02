/**
 * Tile class used to hold tile image and associated sockets inside
 */
export default class Tile {

    constructor(imgName, imgObj, imgSockets) {
        
        if (imgObj) {
            this.imgObj = imgObj;
        } else {
            throw new TypeError("second argument to the constructor must be P5 image object");
        }
        if (Array.isArray(imgSockets) && imgSockets.length == 4) {
            this.sockets = [...imgSockets];
        }else{
            throw new TypeError("Image sockets passed to the constructor as third argument must be an array of length 4");
        }

        this.imgName = imgName ? imgName : "Tile_Img";
    }

    // String override
    toString() {
        let padding = new Array(Math.ceil(this.sockets[0].toString().length / 2) + 1).fill(" ").join("");
        return `${padding + this.sockets[0]}\n${this.sockets[3]} + ${this.sockets[1]}\n${padding + this.sockets[2]}`;
    }

    // JSON override
    toJSON() {
        return this.imgName;
    }

    /*** Static Members *******/

    // Information regarding opposite sockets
    static oppositeSockets = {
        0: 2,
        1: 3,
        2: 0,
        3: 1
    }

    // Default method to compare sockets of different tiles
    static isCompatible = (first, socketIndex, second) => first.sockets[socketIndex] == second.sockets[Tile.oppositeSockets[socketIndex]]
}