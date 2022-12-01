export default class Tile {

    constructor(imgName, imgObj, imgSockets) {

        this.imgName = imgName;
        this.imgObj = imgObj;
        if (Array.isArray(imgSockets)) {
            this.sockets = [...imgSockets];
        }
    }

    toString() {
        let padding = new Array(Math.ceil(this.sockets[0].toString().length / 2) + 1).fill(" ").join("");
        return `${padding + this.sockets[0] + padding}\n${this.sockets[3]} + ${this.sockets[1]}\n${padding + this.sockets[2] + padding}`;
    }

    toJSON() {
        return this.imgName;
    }

    /*** Static Members *******/

    static oppositeSockets = {
        0: 2,
        1: 3,
        2: 0,
        3: 1
    }

    static isCompatible = (first, socketIndex, second) => first.sockets[socketIndex] == second.sockets[Tile.oppositeSockets[socketIndex]]
}