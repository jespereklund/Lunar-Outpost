<script>
    import { onMount } from "svelte"
    let canvasWidth = 800
    let canvasHeight = 600
    let background = '#003300'

    const shipSize = 100
    const drawTime = 20
    const acc = 0.2
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
    let timeRunning = false
    let flameDirection
    let flameOn = false

    onMount(async () => {
        drawTimer = setInterval(draw, drawTime)
        ctx = canvas.getContext('2d')
        document.onkeydown = checkKey
        document.onkeyup = removeFlame
        ctx.font = "bold 100px Courier"
    })

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
        ctx.fillStyle = "#006600"
        ctx.fillRect(shipX, shipY, shipSize, shipSize)

        //flame
        if (flameOn) {
            drawFlame(flameDirection)
        }

        //check collision with red exit bar (succes)
        if (checkCompleted()) {
            shipXSpeed = 0
            shipYSpeed = 0

            ctx.fillStyle = "#ff3300"
            ctx.fillText("You did it!", 100, 320)

            timeRunning = false

        //check collision with any wall (failed)
        } else if (checkCollisions()) {
            shipXSpeed = 0
            shipYSpeed = 0

            ctx.fillStyle = "#ff3300"
            ctx.fillText("Game Over!", 110, 320)

            timeRunning = false
        }

        shipX += shipXSpeed
        shipY += shipYSpeed

        if (timeRunning) {
            let now = new Date()
            timeString = ((now - startTime) / 1000).toFixed(1) + " seconds"
        }
    }

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

    function checkKey(e) {
        if(timeRunning === false) {
            startTime = new Date()
            timeRunning = true
        }
        
        //up
        if (e.keyCode == '38' || e.keyCode == '87') {
            startFlame("up")
            shipYSpeed -= acc
        }

        //down
        else if (e.keyCode == '40' || e.keyCode == '83') {
            startFlame("down")
            shipYSpeed += acc
        }

        //left
        else if (e.keyCode == '37' || e.keyCode == '65') {
            startFlame("left")
            shipXSpeed -= acc
        }

        //right
        else if (e.keyCode == '39' || e.keyCode == '68') {
            startFlame("right")
            shipXSpeed += acc
        }
    }

    function startFlame(dir) {
        flameDirection = dir
        flameOn = true
    }

    function removeFlame() {
        flameOn = false
    }

    function drawFlame(flameDirection) {
        ctx.beginPath();
        ctx.fillStyle = "#ff6600"
        switch(flameDirection) {
            case "up":
                ctx.moveTo(shipX + shipSize / 2 - 10, shipY + shipSize);
                ctx.lineTo(shipX + shipSize / 2, shipY + shipSize + Math.random() * 20 + 10);
                ctx.lineTo(shipX + shipSize / 2 + 10, shipY + shipSize);
                break;

            case "down":
                ctx.moveTo(shipX + shipSize / 2 - 10, shipY);
                ctx.lineTo(shipX + shipSize / 2, shipY - Math.random() * 20 - 10);
                ctx.lineTo(shipX + shipSize / 2 + 10, shipY);
                break;

            case "left":
                ctx.moveTo(shipX + shipSize, shipY + shipSize / 2 - 10);
                ctx.lineTo(shipX + shipSize + Math.random() * 20 + 10, shipY + shipSize / 2 );
                ctx.lineTo(shipX + shipSize, shipY + shipSize / 2 + 10);
                break;

            case "right":
                ctx.moveTo(shipX, shipY + shipSize / 2 - 10);
                ctx.lineTo(shipX - Math.random() * 20 - 10, shipY + shipSize / 2 );
                ctx.lineTo(shipX, shipY + shipSize / 2 + 10);
                break;

            default:
                break;
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
        <p style="font-size: 40px; margin: 0; padding: 0; color: #00ff00; font-family:'Courier New', Courier, monospace; font-weight:bolder;">{timeString}</p>
    </div>
</main>