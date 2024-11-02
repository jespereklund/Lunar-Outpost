
export default class Tracks {
    track 
    _walls
    
    constructor() {
        this.track = 0

        this._walls = [
            [
                {x: 0, y: 0, w: 570, h: 20},
                {x: 0, y: 0, w: 20, h: 600},
                {x: 780, y: 0, w: 20, h: 600},
                {x: 0, y: 580, w: 800, h: 20},
                {x: 250, y: 200, w: 20, h: 400},
                {x: 550, y: 0, w: 20, h: 400}
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