<script>
    import { onMount } from "svelte"
    import KeyboardManager from "./KeyboardManager.js"
    import Tracks from "./Tracks.js";

    let canvasWidth = 1000
    let canvasHeight = 600

    const shipSize = 100
    const drawTime = 20
    const acc = 0.05
    
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

    let tracks = new Tracks()
    let keyboardManager = new KeyboardManager()

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

    //calculate movements of the ship and checks for collisions
    function nextFrame() {

        //check if ship has left the labyrinth
        if (shipX < - shipSize || shipX + shipSize > canvasWidth + shipSize || shipY < - shipSize || shipY + shipSize > canvasHeight + shipSize) {
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
        shipYSpeed += acc * (keyboardManager.trust.down - keyboardManager.trust.up)
        shipXSpeed += acc * (keyboardManager.trust.right - keyboardManager.trust.left)
        shipX += shipXSpeed
        shipY += shipYSpeed

        //if game is running, calcutalte time spend 
        if (gameState === "running") {
            let now = new Date()
            timeString = ((now - startTime) / 1000).toFixed(1) + " seconds"
        } 
    }

    //test if ship has collided with any of the walls
    function checkCollisions() {
        let collide = false
        tracks.walls.forEach(wall => {
            if (shipX + shipSize > wall.x && shipX < wall.x + wall.w && shipY + shipSize > wall.y && shipY < wall.y + wall.h) {
                collide = true
            }
        })
        return collide
    }

    //set pressed key in trust object to 1 and start game at first keypressed event
    function keyDownHandler(e) {
        startGame()
        keyboardManager.keyDownHandler(e.keyCode)
    }

    //set released key in trust object to 0
    function keyUpHandler(e) {
        keyboardManager.keyUpHandler(e.keyCode)
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
         {#each tracks.walls as wall}
            <rect x={wall.x} y={wall.y} width={wall.w} height={wall.h} class="wall" />    
         {/each}

        <!-- ship -->
        <rect class="ship" x={shipX + 5} y={shipY + 5} width={shipSize - 10} height={shipSize - 10} />

        <!-- end text -->
        <text x="240" y="300" class="text">{text}</text>

        <!-- buttom flame -->
        <polygon points="
            {shipX + shipSize / 2 - 10},{shipY + shipSize - 2} 
            {shipX + shipSize / 2},{shipY + shipSize + Math.random() * 20 + 10}
            {shipX + shipSize / 2 + 10},{shipY + shipSize - 2}" 
            class="flame" 
            visibility={(keyboardManager.trust.up === 1 && gameState === "running") ? "visible" : "hidden"} />

        <!-- top flame -->
        <polygon points="
            {shipX + shipSize / 2 - 10},{shipY + 2}
            {shipX + shipSize / 2},{shipY - Math.random() * 20 - 10}
            {shipX + shipSize / 2 + 10},{shipY + 2}" 
            class="flame" 
            visibility={(keyboardManager.trust.down === 1 && gameState === "running") ? "visible" : "hidden"} />

        <!-- right side flame -->
        <polygon points="
            {shipX + shipSize - 2},{shipY + shipSize / 2 - 10}
            {shipX + shipSize + Math.random() * 20 + 10},{shipY + shipSize / 2}
            {shipX + shipSize - 2},{shipY + shipSize / 2 + 10}" 
            class="flame" 
            visibility={(keyboardManager.trust.left === 1 && gameState === "running") ? "visible" : "hidden"} />

        <!-- left side flame -->
        <polygon points="
            {shipX + 2},{shipY + shipSize / 2 - 10}
            {shipX - Math.random() * 20 - 10},{shipY + shipSize / 2}
            {shipX + 2},{shipY + shipSize / 2 + 10}" 
            class="flame" 
            visibility={(keyboardManager.trust.right && gameState === "running") ? "visible" : "hidden"} />

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