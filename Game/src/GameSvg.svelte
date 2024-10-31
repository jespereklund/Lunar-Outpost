<script>
    import { onMount } from "svelte"
    let canvasWidth = 800
    let canvasHeight = 600

    const shipSize = 100
    const drawTime = 20
    const acc = 0.05
    const wallThickness = 20

    const walls = [
        {x: 0, y: 0, w: canvasWidth - 230, h: wallThickness},
        {x: 0, y: 0, w: wallThickness, h: canvasHeight},
        {x: canvasWidth - wallThickness, y: 0, w: wallThickness, h: canvasHeight},
        {x: 0, y: canvasHeight - wallThickness, w: canvasWidth, h: wallThickness},
        {x: 250, y: 200, w: wallThickness, h: 400},
        {x: 550, y: 0, w: wallThickness, h: 400}
    ]

    const keys = {
        left: [37, 65], //arrow left and a
        right: [39, 68], //arrow right and d
        up: [38, 87], //arrow up and w
        down: [40, 83] //arrow down and s
    }

    let drawTimer
    let svg
    let shipX = 80
    let shipY = 420
    let shipXSpeed = 0
    let shipYSpeed = 0
    let text
    let timeString = "0.0 seconds"
    let startTime
    let gameState = "start"
    let trust = {left: 0, right: 0, up: 0,  down: 0}

    onMount(async () => {
        drawTimer = setInterval(nextFrame, drawTime)
        document.onkeydown = keyDownHandler
        document.onkeyup = keyUpHandler
    })

    //called when first key is pressed
    function startGame() {
        if(gameState === "start") {
            startTime = new Date()
            gameState = "running"
        }
    }

    //calculate movements of the ship and check for collisions
    function nextFrame() {

        //check if ship has left the labyrinth
        if (checkCompleted()) {
            shipXSpeed = 0
            shipYSpeed = 0
            text = "You did it!"
            gameState = "success"
            clearInterval(drawTimer)

        //check collision with any wall (failed)
        } else if (checkCollisions()) {
            shipXSpeed = 0
            shipYSpeed = 0
            text = "Game Over!"
            gameState = "failed"
            clearInterval(drawTimer)
        }

        //move ship
        shipYSpeed += acc * (trust.down - trust.up)
        shipXSpeed += acc * (trust.right - trust.left)
        shipX += shipXSpeed
        shipY += shipYSpeed

        //if game is running, calcutalte time spend 
        if (gameState === "running") {
            let now = new Date()
            timeString = ((now - startTime) / 1000).toFixed(1) + " seconds"
        } 
    }

    //test if ship has moved outside of the labyrinth
    function checkCompleted() {
        let completed = false
        if (shipX < - shipSize || shipX + shipSize > canvasWidth + shipSize || shipY < - shipSize || shipY + shipSize > canvasHeight + shipSize) {
            completed = true
        }
        return completed
    }

    //test if ship has collided with any of the walls
    function checkCollisions() {
        let collide = false
        walls.forEach(wall => {
            if (shipX + shipSize > wall.x && shipX < wall.x + wall.w && shipY + shipSize > wall.y && shipY < wall.y + wall.h) {
                collide = true
            }
        })
        return collide
    }

    //set pressed key in trust object to 1 and start game at first keypressed event
    function keyDownHandler(e) {
        startGame()
        const key = e.keyCode
        if(keys.left.includes(key)) {
            trust.left = 1
        }

        if(keys.right.includes(key)) {
            trust.right = 1
        }

        if(keys.up.includes(key)) {
            trust.up = 1
        }

        if(keys.down.includes(key)) {
            trust.down = 1
        }
    }

    //set released key in trust object to 0
    function keyUpHandler(e) {
        const key = e.keyCode

        if(keys.left.includes(key)) {
            trust.left = 0
        }

        if(keys.right.includes(key)) {
            trust.right = 0
        }

        if(keys.up.includes(key)) {
            trust.up = 0
        }

        if(keys.down.includes(key)) {
            trust.down = 0
        }
    }
</script>
<main>
    <svg
        width={canvasWidth}
        height={canvasHeight}
        bind:this={svg}>

        <!-- background -->
        <rect class="bg" width={canvasWidth} height={canvasHeight} x="0" y="0" />

        <!-- walls -->
         {#each walls as wall}
            <rect x={wall.x} y={wall.y} width={wall.w} height={wall.h} class="wall" />    
         {/each}

        <!-- ship -->
        <rect class="ship" x={shipX + 5} y={shipY + 5} width={shipSize - 10} height={shipSize - 10} />

        <!-- end text -->
        <text x="160" y="300" class="text">{text}</text>

        <!-- buttom flame -->
        <polygon points="
            {shipX + shipSize / 2 - 10},{shipY + shipSize - 2} 
            {shipX + shipSize / 2},{shipY + shipSize + Math.random() * 20 + 10}
            {shipX + shipSize / 2 + 10},{shipY + shipSize - 2}" 
            class="flame" 
            visibility={(trust.up === 1 && gameState === "running") ? "visible" : "hidden"} />

        <!-- top flame -->
        <polygon points="
            {shipX + shipSize / 2 - 10},{shipY + 2}
            {shipX + shipSize / 2},{shipY - Math.random() * 20 - 10}
            {shipX + shipSize / 2 + 10},{shipY + 2}" 
            class="flame" 
            visibility={(trust.down === 1 && gameState === "running") ? "visible" : "hidden"} />

        <!-- right side flame -->
        <polygon points="
            {shipX + shipSize - 2},{shipY + shipSize / 2 - 10}
            {shipX + shipSize + Math.random() * 20 + 10},{shipY + shipSize / 2}
            {shipX + shipSize - 2},{shipY + shipSize / 2 + 10}" 
            class="flame" 
            visibility={(trust.left === 1 && gameState === "running") ? "visible" : "hidden"} />

        <!-- left side flame -->
        <polygon points="
            {shipX + 2},{shipY + shipSize / 2 - 10}
            {shipX - Math.random() * 20 - 10},{shipY + shipSize / 2}
            {shipX + 2},{shipY + shipSize / 2 + 10}" 
            class="flame" 
            visibility={(trust.right && gameState === "running") ? "visible" : "hidden"} />

    </svg>
    <br>
    <div>
        <p class="time" >{timeString}</p>
    </div>
</main>
<style>
    .bg {
        fill: #003300; 
    }

    .wall {
        fill: #00aa00;
    }
    .ship {
        stroke: #006699; 
        stroke-width: 5; 
        fill: #000066;
    }
    .flame {
        fill: #ff6600;
    }
    .text {
        font: bold 80px courier;
        fill: #00ff00;
    }
    .time {
        font-size: 40px; 
        margin: 0; 
        padding: 0; 
        color: #00ff00; 
        font-family:'Courier New', Courier, monospace; 
        font-weight:bolder;
    }
</style>