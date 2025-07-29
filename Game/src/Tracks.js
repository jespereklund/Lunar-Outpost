export const tracks = 
[
    {
        name: "Vareindlevering",
        walls:
            [
                {x: 0, y: 0, w: 1000, h: 20}, //north
                {x: 0, y: 0, w: 20, h: 600}, //west
                {x: 980, y: 200, w: 20, h: 600}, //east
                {x: 0, y: 580, w: 1000, h: 20} //south
            ],
        ship: {x: 80, y: 420}
    },
    {
        name: "Lager",
        walls:
            [
                {x: 0, y: 0, w: 1000, h: 20}, //north
                {x: 0, y: 0, w: 20, h: 600}, //west
                {x: 980, y: 0, w: 20, h: 400}, //east
                {x: 0, y: 580, w: 1000, h: 20}, //south
                {x: 500, y: 200, w: 20, h: 400},
            ],
        ship: {x: 80, y: 420}
    },
    {
        name: "Motorrum",
        walls:
            [
                {x: 0, y: 0, w: 1000, h: 20}, //north
                {x: 0, y: 200, w: 20, h: 600}, //west
                {x: 980, y: 0, w: 20, h: 600}, //east
                {x: 0, y: 580, w: 1000, h: 20}, //south
                {x: 0, y: 280, w: 800, h: 20}
            ],
        ship: {x: 80, y: 420}
    },
    {
        name: "Kontrolrum",
        walls:
            [
                {x: 0, y: 0, w: 1000, h: 20}, //north
                {x: 0, y: 0, w: 20, h: 600}, //west
                {x: 980, y: 200, w: 20, h: 600}, //east
                {x: 0, y: 580, w: 1000, h: 20}, //south
                {x: 500, y: 0, w: 20, h: 400}
            ],
        ship: {x: 80, y: 420}
    },
    {
        name: "Værksted",
        walls:
            [
                {x: 0, y: 0, w: 1000, h: 20}, //north
                {x: 0, y: 0, w: 20, h: 600}, //west
                {x: 980, y: 200, w: 20, h: 600}, //east
                {x: 0, y: 580, w: 1000, h: 20}, //south
                {x: 250, y: 200, w: 20, h: 400},
                {x: 500, y: 0, w: 20, h: 400},
                {x: 700, y:200, w:400, h: 20}
            ],
        ship: {x: 80, y: 420}
    },
    {
        name: "Kantine",
        walls:
            [
                {x: 0, y: 0, w: 1000, h: 20}, //north
                {x: 0, y: 0, w: 20, h: 600}, //west
                {x: 980, y: 200, w: 20, h: 600}, //east
                {x: 0, y: 580, w: 1000, h: 20}, //south
                {x: 240, y: 200, w: 20, h: 400, moveY: {yMin: 0, yMax: 200, dir: -1}},
                {x: 480, y: 0, w: 20, h: 400, moveY: {yMin: 0, yMax: 200, dir: -1}},
                {x: 720, y: 200, w: 20, h: 400, moveY: {yMin: 0, yMax: 200, dir: -1}},
                
            ],
        ship: {x: 80, y: 420}
    },    
    {
        name: "Træningscenter",
        walls:
            [
                {x: 0, y: 0, w: 1000, h: 20}, //north
                {x: 0, y: 0, w: 20, h: 600}, //west
                {x: 980, y: 200, w: 20, h: 600}, //east
                {x: 0, y: 580, w: 1000, h: 20}, //south
                {x: 200, y: 180, w: 800, h: 20, moveX: {xMin: 0, xMax: 200, dir: -1}},
                {x: 0, y: 380, w: 800, h: 20, moveX: {xMin: 0, xMax: 200, dir: 1}}
                
            ],
        ship: {x: 60, y: 440}
    },
    {
        name: "Kølerum",
        walls:
            [
                {x: 0, y: 0, w: 1000, h: 20}, //north
                {x: 0, y: 0, w: 20, h: 600}, //west
                {x: 980, y: 200, w: 20, h: 600}, //east
                {x: 0, y: 580, w: 1000, h: 20}, //south
                {x: 250, y: 200, w: 20, h: 400},
                {x: 500, y: 0, w: 20, h: 400},
                {x: 500, y: 400, w:300, h:20, moveX: {xMin: 500, xMax: 680, dir: 1}},
                {x: 700, y:200, w:400, h: 20}
            ],
        ship: {x: 80, y: 420}
    },
    {
        name: "Opholdsstue",
        walls:
            [
                {x: 0, y: 0, w: 1000, h: 20}, //north
                {x: 0, y: 0, w: 20, h: 600}, //west
                {x: 980, y: 200, w: 20, h: 600}, //east
                {x: 0, y: 580, w: 1000, h: 20}, //south
                {x: 130, y: 150, w: 20, h: 430},
                {x: 260, y: 0, w: 20, h: 410},
                {x: 260, y: 410, w: 600, h: 20},
                {x: 420, y: 200, w: 600, h: 20},
            ],
        ship: {x: 25, y: 475}
    },
    {
        name: "Depot",
        walls:
            [
                {x: 0, y: 0, w: 1000, h: 20}, //north
                {x: 0, y: 0, w: 20, h: 600}, //west
                {x: 980, y: 0, w: 20, h: 600}, //east
                {x: 0, y: 580, w: 850, h: 20}, //south
                {x: 380, y: 280, w: 320, h: 20},
                {x: 700, y: 280, w: 20, h: 170},
                {x: 200, y: 430, w: 520, h: 20},
                {x: 200, y: 170, w: 20, h: 270},
                {x: 200, y: 150, w: 670, h: 20},
                {x: 850, y: 170, w: 20, h: 570},

            ],
        ship: {x: 580, y: 320}
    },
    {
        name: "Raffinaderi",
        walls:
            [
                {x: 0, y: 0, w: 1000, h: 20}, //north
                {x: 0, y: 0, w: 20, h: 600}, //west
                {x: 980, y: 200, w: 20, h: 600}, //east
                {x: 0, y: 580, w: 1000, h: 20}, //south
                {x: 550, y: 180, w: 20, h: 400},
                {x: 420, y: 180, w: 20, h: 280},
                {x: 290, y: 300, w: 20, h: 290},
                {x: 150, y: 180, w: 20, h: 280},
                {x: 150, y: 160, w: 420, h: 20},
                {x: 690, y: 0, w: 20, h: 440},
                {x: 690, y: 440, w: 150, h: 20},
                {x: 840, y: 200, w: 160, h: 20},
                {x: 820, y: 360, w: 20, h: 100}
            ],
        ship: {x: 445, y: 186}
    }
]
