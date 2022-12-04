import Tile from "./Tile.js"

export default {
    maze: {
        imgFileExt: "jpg",
        imageNames: [
            "tile_none",
            "tile_rdl",
            "tile_rl",
            "tile_ud",
            "tile_uld",
            "tile_urd",
            "tile_url",
            "tile_plus",
            "tile_ur",
            "tile_lu",
            "tile_dl",
            "tile_rd",
            "tile_l",
            "tile_r",
            "tile_u",
            "tile_d"
        ],
        imageSockets: [
            [0, 0, 0, 0],
            [0, 1, 1, 1],
            [0, 1, 0, 1],
            [1, 0, 1, 0],
            [1, 0, 1, 1],
            [1, 1, 1, 0],
            [1, 1, 0, 1],
            [1, 1, 1, 1],
            [1, 1, 0, 0],
            [1, 0, 0, 1],
            [0, 0, 1, 1],
            [0, 1, 1, 0],
            [0, 0, 0, 1],
            [0, 1, 0, 0],
            [1, 0, 0, 0],
            [0, 0, 1, 0]
        ]
    },
    circuit: {
        imgFileExt: "png",
        imageNames: [
            "bridge",
            "component",
            "connection",
            "corner",
            "dskew",
            "skew",
            "substrate",
            "t",
            "track",
            "transition",
            "turn",
            "viad",
            "vias",
            "wire"
        ],
        imageSockets: [
            ["gbg", "gsg", "gbg", "gsg"],
            ["BBB", "BBB", "BBB", "BBB"],
            ["gbg", "ggB", "BBB", "Bgg"],
            ["ggg", "ggg", "ggB", "Bgg"],
            ["gbg", "gbg", "gbg", "gbg"],
            ["gbg", "gbg", "ggg", "ggg"],
            ["ggg", "ggg", "ggg", "ggg"],
            ["ggg", "gbg", "gbg", "gbg"],
            ["gbg", "ggg", "gbg", "ggg"],
            ["gsg", "ggg", "gbg", "ggg"],
            ["gbg", "gbg", "ggg", "ggg"],
            ["ggg", "gbg", "ggg", "gbg"],
            ["gbg", "ggg", "ggg", "ggg"],
            ["ggg", "gsg", "ggg", "gsg"]
        ],
        comparator: (t1, sIndex, t2) => t1.sockets[sIndex] == [...t2.sockets[Tile.oppositeSockets[sIndex]]].reverse().join("")
    }
}