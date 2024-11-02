const keys = {
    left: [37, 65], //arrow left and a
    right: [39, 68], //arrow right and d
    up: [38, 87], //arrow up and w
    down: [40, 83] //arrow down and s
}    

export default class KeyboardManager {
    trust = {left: 0, right: 0, up: 0,  down: 0}

    //set pressed key in trust object to 1 and start game at first keypressed event
    keyDownHandler(key) {
        if(keys.left.includes(key)) {
            this.trust.left = 1
        }

        if(keys.right.includes(key)) {
            this.trust.right = 1
        }

        if(keys.up.includes(key)) {
            this.trust.up = 1
        }

        if(keys.down.includes(key)) {
            this.trust.down = 1
        }
    }

    //set released key in trust object to 0
    keyUpHandler(key) {
        if(keys.left.includes(key)) {
            this.trust.left = 0
        }

        if(keys.right.includes(key)) {
            this.trust.right = 0
        }

        if(keys.up.includes(key)) {
            this.trust.up = 0
        }

        if(keys.down.includes(key)) {
            this.trust.down = 0
        }
    }
}