<script>
    import { onMount } from "svelte"
    let canvasWidth = 800
    let canvasHeight = 600
    let background = '#003300'

    const shipSize = 100
    const drawTime = 20
    const acc = 0.05
    const wallThickness = 20

    const wall1 = [250, 300, wallThickness, 300]
    const wall2 = [550, 0, wallThickness, 300]

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
    let keysPressed = []

    onMount(async () => {
        drawTimer = setInterval(draw, drawTime)
        ctx = canvas.getContext('2d')
        document.onkeydown = keyDownHandler
        document.onkeyup = keyUpHandler
        ctx.font = "bold 100px Courier"
    })

    function startGame() {
        startTime = new Date()
        gameRunning = true
    }

    //draw all element on screen
    function draw() {

        //outer walls
        ctx.clearRect(0, 0, canvasWidth, canvasHeight)
        ctx.fillStyle = "#006600"
        ctx.strokeStyle = "#00ff00"
        ctx.lineWidth = wallThickness
        ctx.strokeRect(0, 0, canvasWidth, canvasHeight)
        
        //exit
        ctx.fillStyle = "#990000"
        ctx.fillRect(wall2[0] + wallThickness - 1, 0, 221, wallThickness / 2)

        //inner walls
        ctx.fillStyle = "#00ff00"
        ctx.fillRect(wall1[0], wall1[1], wall1[2], wall1[3])
        ctx.fillRect(wall2[0], wall2[1], wall2[2], wall2[3])

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

    function drawFlames() {
        ctx.beginPath();
        ctx.fillStyle = "#ff6600"

        //buttom
        if (keysPressed.includes(38) || keysPressed.includes(87)) {
            ctx.moveTo(shipX + shipSize / 2 - 10, shipY + shipSize);
            ctx.lineTo(shipX + shipSize / 2, shipY + shipSize + Math.random() * 20 + 10);
            ctx.lineTo(shipX + shipSize / 2 + 10, shipY + shipSize);
        }

        //top
        if (keysPressed.includes(40) || keysPressed.includes(83)) {
            ctx.moveTo(shipX + shipSize / 2 - 10, shipY);
            ctx.lineTo(shipX + shipSize / 2, shipY - Math.random() * 20 - 10);
            ctx.lineTo(shipX + shipSize / 2 + 10, shipY);
        }

        //right side
        if (keysPressed.includes(37) || keysPressed.includes(65)) {
            ctx.moveTo(shipX + shipSize, shipY + shipSize / 2 - 10);
            ctx.lineTo(shipX + shipSize + Math.random() * 20 + 10, shipY + shipSize / 2 );
            ctx.lineTo(shipX + shipSize, shipY + shipSize / 2 + 10);
        }

        //left side
        if (keysPressed.includes(39) || keysPressed.includes(68)) {
            ctx.moveTo(shipX, shipY + shipSize / 2 - 10);
            ctx.lineTo(shipX - Math.random() * 20 - 10, shipY + shipSize / 2 );
            ctx.lineTo(shipX, shipY + shipSize / 2 + 10);
        }        
        ctx.fill();
    }

    //test if ship has reached the red exit bar
    function checkCompleted() {
        let completed = false
        if (
            shipX > wall2[0] + wallThickness / 2 && 
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
            ( shipX + shipSize > wall1[0] 
            && shipX < wall1[0] + wallThickness 
            && shipY + shipSize > wall1[1]) 
            || 
                
            //Wall 2
            ( shipX + shipSize > wall2[0] 
            && shipX < wall2[0] + wallThickness 
            && shipY < wall2[1] + wall2[3])) 
        {
            collide = true
        }
        return collide
    }

    //put pressed key in array and start game at first keypressed event
    function keyDownHandler(e) {
        if (gameRunning) {
            if (keysPressed.indexOf(e.keyCode) === -1 ) {
                keysPressed.push(e.keyCode)
            }
        } else {
            startGame()
        }
    }

    //remove released key from key pressed array
    function keyUpHandler(e) {
        keysPressed.splice(keysPressed.indexOf(e.keyCode))
    }

    //change the ships speed according to keys pressed (arrow keys and WASD)
    function moveShip() {
        //up (up arrow and w)
        if (keysPressed.includes(38) || keysPressed.includes(87)) {
            shipYSpeed -= acc
        }

        //down (down arrow and s)
        if (keysPressed.includes(40) || keysPressed.includes(83)) {
            shipYSpeed += acc
        }

        //left (left arrow and a)
        if (keysPressed.includes(37) || keysPressed.includes(65)) {
            shipXSpeed -= acc
        }

        //right (right arrow and d)
        if (keysPressed.includes(39) || keysPressed.includes(68)) {
            shipXSpeed += acc
        }        
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