
export default class Walls {

    canvasWidth
    canvasHeight
    wallThickness
    track 

    _walls
    
    constructor(canvasWidth, canvasHeight, wallThickness, track) {
        this.canvasWidth = canvasWidth
        this.canvasHeight = canvasHeight
        this.wallThickness = wallThickness
        this.track = track

        this._walls = [
            [
                {x: 0, y: 0, w: canvasWidth - 230, h: wallThickness},
                {x: 0, y: 0, w: wallThickness, h: canvasHeight},
                {x: canvasWidth - wallThickness, y: 0, w: wallThickness, h: canvasHeight},
                {x: 0, y: canvasHeight - wallThickness, w: canvasWidth, h: wallThickness},
                {x: 250, y: 200, w: wallThickness, h: 400},
                {x: 550, y: 0, w: wallThickness, h: 400}
            ],
            [
                {x: canvasWidth - wallThickness, y: 0, w: wallThickness, h: canvasHeight},
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