<script>
    import { onMount } from "svelte";
    export let width = 800
    export let height = 600
    export let background = '#003300'

    const shipSize = 100
    const drawTime = 20
    const acc = 0.3
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
    

    onMount(async () => {
        drawTimer = setInterval(draw, drawTime)
        ctx = canvas.getContext('2d')
        document.onkeydown = checkKey;
        ctx.font = "bold 100px Courier";
        
    })

    function draw() {

        //outer walle
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "#006600";
        ctx.strokeStyle = "#00ff00";
        ctx.lineWidth = wallThickness;
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        
        //exit
        ctx.fillStyle = "#990000";
        ctx.fillRect(wall2[0] + wallThickness - 1, 0, 221, wallThickness / 2)

        //inner walls
        ctx.fillStyle = "#00ff00";
        ctx.fillRect(wall1[0], wall1[1], wall1[2], wall1[3])
        ctx.fillRect(wall2[0], wall2[1], wall2[2], wall2[3])

        //ship
        ctx.fillStyle = "#006600";
        ctx.fillRect(shipX, shipY, shipSize, shipSize);

        if (checkCompleted() === true) {
            shipXSpeed = 0
            shipYSpeed = 0

            ctx.fillStyle = "#ff3300";
            ctx.fillText("You did it!", 110, 320);
        } else if (checkCollisions() === true) {
            shipXSpeed = 0
            shipYSpeed = 0

            ctx.fillStyle = "#ff3300";
            ctx.fillText("Game Over!", 110, 320);
        }

        shipX += shipXSpeed
        shipY += shipYSpeed

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
            || shipX + shipSize + wallThickness / 2 > canvas.width 
            || shipY < wallThickness / 2 
            || shipY + shipSize + wallThickness / 2 > canvas.height ) 
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

        e = e || window.event;

        if (e.keyCode == '38') {
            shipYSpeed -= acc
        }
        else if (e.keyCode == '40') {
            shipYSpeed += acc
        }
        else if (e.keyCode == '37') {
            shipXSpeed -= acc
        }
        else if (e.keyCode == '39') {
            shipXSpeed += acc
        }

    }
</script>
<main>
    <canvas
        {width}
		{height}
        style:background
        bind:this={canvas} 
    >
    </canvas>
</main>