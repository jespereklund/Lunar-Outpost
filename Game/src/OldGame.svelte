<script>
    import { onMount } from "svelte"
    let canvasWidth = 800
    let canvasHeight = 600
    let background = '#003300'

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
    let canvas
    let shipX = 80
    let shipY = 420
    let shipXSpeed = 0
    let shipYSpeed = 0
    let ctx
    let timeString = "0.0 seconds"
    let startTime
    let gameRunning = false
    let trust = {
        left: 0,
        right: 0,
        up: 0, 
        down: 0
    }

    onMount(async () => {
        drawTimer = setInterval(draw, drawTime)
        ctx = canvas.getContext('2d')
        document.onkeydown = keyDownHandler
        document.onkeyup = keyUpHandler
        ctx.font = "bold 100px Courier"
    })

    //called when first key is pressed
    function startGame() {
        if(!gameRunning) {
            startTime = new Date()
            gameRunning = true
        }
    }

    //draw all element on screen
    function draw() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight)

        //outer walls
        ctx.fillStyle = "#006600"
        ctx.strokeStyle = "#00ff00"
        ctx.lineWidth = wallThickness
        ctx.strokeRect(0, 0, canvasWidth, canvasHeight)
        
        //exit
        ctx.fillStyle = "#990000"
        ctx.fillRect(wall2.x + wallThickness - 1, 0, 221, wallThickness / 2)

        //inner walls
        ctx.fillStyle = "#00ff00"
        ctx.fillRect(wall1.x, wall1.y, wall1.w, wall1.h)
        ctx.fillRect(wall2.x, wall2.y, wall2.w, wall2.h)

        //ship
        ctx.fillStyle = "#006699"
        ctx.fillRect(shipX, shipY, shipSize, shipSize)
        ctx.fillStyle = "#000066"
        ctx.fillRect(shipX + 5, shipY + 5, shipSize - 10, shipSize - 10)

        //check collision with red exit bar (succes)
        if (checkCompleted()) {
            shipXSpeed = 0
            shipYSpeed = 0

            ctx.fillStyle = "#ff3300"
            ctx.fillText("You did it!", 100, 320)

            gameRunning = false

        //check collision with any wall (failed)
        } else if (checkCollisions()) {
            shipXSpeed = 0
            shipYSpeed = 0

            ctx.fillStyle = "#ff3300"
            ctx.fillText("Game Over!", 110, 320)

            gameRunning = false
        }

        //move ship
        shipX += shipXSpeed
        shipY += shipYSpeed
        moveShip()

        //if game is running, draw flames and calcutalte time spend 
        if (gameRunning) {
            drawFlames()
            let now = new Date()
            timeString = ((now - startTime) / 1000).toFixed(1) + " seconds"
        } 
    }

    //test if ship has reached the red exit bar
    function checkCompleted() {
        let completed = false
        if (
            shipX > wall2.x + wallThickness / 2 && 
            shipX + shipSize + wallThickness / 2 < canvas.width && 
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

    function drawFlames() {
        ctx.beginPath();
        ctx.fillStyle = "#ff6600"

        //buttom
        if (trust.up === 1) {
            ctx.moveTo(shipX + shipSize / 2 - 10, shipY + shipSize);
            ctx.lineTo(shipX + shipSize / 2, shipY + shipSize + Math.random() * 20 + 10);
            ctx.lineTo(shipX + shipSize / 2 + 10, shipY + shipSize);
        }

        //top
        if (trust.down === 1) {
            ctx.moveTo(shipX + shipSize / 2 - 10, shipY);
            ctx.lineTo(shipX + shipSize / 2, shipY - Math.random() * 20 - 10);
            ctx.lineTo(shipX + shipSize / 2 + 10, shipY);
        }

        //right side
        if (trust.left === 1) {
            ctx.moveTo(shipX + shipSize, shipY + shipSize / 2 - 10);
            ctx.lineTo(shipX + shipSize + Math.random() * 20 + 10, shipY + shipSize / 2 );
            ctx.lineTo(shipX + shipSize, shipY + shipSize / 2 + 10);
        }

        //left side
        if (trust.right === 1) {
            ctx.moveTo(shipX, shipY + shipSize / 2 - 10);
            ctx.lineTo(shipX - Math.random() * 20 - 10, shipY + shipSize / 2 );
            ctx.lineTo(shipX, shipY + shipSize / 2 + 10);
        }        

        ctx.fill();
    }
</script>
<main>
    <canvas
        width={canvasWidth}
		height={canvasHeight}
        style:background
        bind:this={canvas} 
    >
    </canvas>
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