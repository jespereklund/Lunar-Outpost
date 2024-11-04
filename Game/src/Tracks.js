
export default class Tracks {
    track 
    _walls
    
    constructor() {
        this.track = 0
        this._walls = [
            [
                {x: 300, y: 0, w: 1000, h: 20}, //north
                {x: 0, y: 0, w: 20, h: 600}, //west
                {x: 980, y: 200, w: 20, h: 600}, //east
                {x: 0, y: 580, w: 1000, h: 20}, //south
                {x: 250, y: 200, w: 20, h: 400},
                {x: 500, y: 0, w: 20, h: 400},
                {x: 500, y: 400, w:300, h:20},
                {x: 700, y:200, w:400, h: 20}
            ],
            [
                {x: 780, y: 0, w: 20, h: 600},
            ]
        ]
    }

    set currentTrack(track) {
        track = track
    }

    get walls() {
        return this._walls[this.track]
    }
}