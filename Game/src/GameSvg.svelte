<script>
    import { onMount } from "svelte"
    let canvasWidth = 800
    let canvasHeight = 600

    const shipSize = 100
    const drawTime = 20
    const acc = 0.05
    const wallThickness = 20

    const wall1 = {
        x: 250, 
        y: 300, 
        w: wallThickness, 
        h: 300
    }

    const wall2 = {
        x: 550, 
        y: 0, 
        w: wallThickness, 
        h: 300
    }

    const keys = {
        left: [37, 65], //arrow left and a
        right: [39, 68], //arrow right and d
        up: [38, 87], //arrow up and w
        down: [40, 83] //arrow down and s
    }

    let drawTimer
    //let canvas
    let svg
    let shipX = 80
    let shipY = 420
    let shipXSpeed = 0
    let shipYSpeed = 0
    let text
    let timeString = "0.0 seconds"
    let startTime
    let gameState = "start"
    let trust = {
        left: 0,
        right: 0,
        up: 0, 
        down: 0
    }

    onMount(async () => {
        drawTimer = setInterval(draw, drawTime)
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

    //draw all element on screen
    function draw() {

        //check collision with red exit bar (succes)
        if (checkCompleted()) {
            shipXSpeed = 0
            shipYSpeed = 0
            text = "You did it!"
            gameState = "success"

        //check collision with any wall (failed)
        } else if (checkCollisions()) {
            shipXSpeed = 0
            shipYSpeed = 0
            text = "Game Over!"
            gameState = "failed"
        }

        //move ship
        shipX += shipXSpeed
        shipY += shipYSpeed
        moveShip()

        //if game is running, draw flames and calcutalte time spend 
        if (gameState === "running") {
            let now = new Date()
            timeString = ((now - startTime) / 1000).toFixed(1) + " seconds"
        } 
    }

    //test if ship has reached the red exit bar
    function checkCompleted() {
        let completed = false
        if (
            shipX > wall2.x + wallThickness / 2 && 
            shipX + shipSize + wallThickness / 2 < canvasWidth && 
            shipY < wallThickness / 2
        ) {
            completed = true
        }
        return completed
    }

    //test if ship has collided with any of the walls
    function checkCollisions() {
        let collide = false

        if (
            //outer walls
            (shipX < wallThickness / 2 
            || shipX + shipSize + wallThickness / 2 > canvasWidth 
            || shipY < wallThickness / 2 
            || shipY + shipSize + wallThickness / 2 > canvasHeight ) 
            || 
            
            //Wall 1
            ( shipX + shipSize > wall1.x 
            && shipX < wall1.x + wallThickness 
            && shipY + shipSize > wall1.y) 
            || 
                
            //Wall 2
            ( shipX + shipSize > wall2.x
            && shipX < wall2.x + wallThickness 
            && shipY < wall2.y + wall2.h)) 
        {
            collide = true
        }
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

    //change the ships speed according to trust object
    function moveShip() {
        shipYSpeed += acc * (trust.down - trust.up)
        shipXSpeed += acc * (trust.right - trust.left)
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
        <rect x={wall1.x} y={wall1.y} width={wall1.w} height={wall1.h} fill="#00aa00" />
        <rect x={wall2.x} y={wall2.y} width={wall2.w} height={wall2.h} fill="#00aa00" />

        <!-- ship -->
        <rect class="ship" x={shipX + 5} y={shipY + 5} width={shipSize - 10} height={shipSize - 10} />

        <!-- red exit bar -->
        <rect class="exit" x={wall2.x + wallThickness} y={0} width={220} height={wallThickness / 2} />

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
        <p style="
            font-size: 40px; 
            margin: 0; 
            padding: 0; 
            color: #00ff00; 
            font-family:'Courier New', Courier, monospace; 
            font-weight:bolder;"
        >{timeString}</p>
    </div>
</main>
<style>
    .bg {
        fill: #003300; 
        stroke-width: 20; 
        stroke: #00aa00;
    }

    .ship {
        stroke: #006699; 
        stroke-width: 5; 
        fill: #000066;
    }
    .flame {
        fill: #ff6600;
    }
    .exit {
        fill: #990000;
    }
    .text {
        font: bold 80px courier;
        fill: #00ff00;
    }
</style>