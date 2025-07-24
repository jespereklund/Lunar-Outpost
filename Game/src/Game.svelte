<script>
    import { onMount } from "svelte"
    import KeyboardManager from "./KeyboardManager.js"
    import {tracks} from "./Tracks.js"
    import { createEventDispatcher } from "svelte"

    export let currentTrackNr = 0
    export let numOfTracks = 0
    let wallColor 

    let canvasWidth = 1000
    let canvasHeight = 600

    const shipSize = 100
    const drawTime = 20
    const acc = 0.05
    const wallSpeed = 0.25
    
    let drawTimer
    let svg
    let ship = {
        x: 0, 
        y: 0, 
        xSpeed: 0, 
        ySpeed: 0 
    }

    let currentTrack = {}
    let wallHue

    let keyboardManager = new KeyboardManager()
    const dispatch = createEventDispatcher()

    onMount(async () => {
        currentTrack = [...tracks][currentTrackNr]
        wallHue = 365 * (currentTrackNr / numOfTracks)
        wallColor = "hsl(" + wallHue + ", 100%, 50%)"
        ship.x = currentTrack.ship.x
        ship.y = currentTrack.ship.y
        drawTimer = setInterval(nextFrame, drawTime)
        document.onkeydown = keyDownHandler
        document.onkeyup = keyUpHandler
    })

    //calculate movements of the ship and walls and test for collisions
    function nextFrame() {

        //move walls
        for(let i=0; i<currentTrack.walls.length; i++) {

            //move x-axis
            if (currentTrack.walls[i].moveX != undefined) {
                if(currentTrack.walls[i].moveX.dir === 1) {
                    if(currentTrack.walls[i].x < currentTrack.walls[i].moveX.xMax) {
                        currentTrack.walls[i].x += wallSpeed
                    } else {
                        currentTrack.walls[i].moveX.dir = -1
                    }

                } else if (currentTrack.walls[i].moveX.dir === -1) {
                    if(currentTrack.walls[i].x > currentTrack.walls[i].moveX.xMin) {
                        currentTrack.walls[i].x -= wallSpeed
                    } else {
                        currentTrack.walls[i].moveX.dir = +1
                    }

                }
            }

            //move y-axis
            if (currentTrack.walls[i].moveY != undefined) {
                if(currentTrack.walls[i].moveY.dir === 1) {
                    if(currentTrack.walls[i].y < currentTrack.walls[i].moveY.yMax) {
                        currentTrack.walls[i].y += wallSpeed
                    } else {
                        currentTrack.walls[i].moveY.dir = -1
                    }
                } else if (currentTrack.walls[i].moveY.dir === -1) {
                    if(currentTrack.walls[i].y > currentTrack.walls[i].moveY.yMin) {
                        currentTrack.walls[i].y -= wallSpeed
                    } else {
                        currentTrack.walls[i].moveY.dir = +1
                    }
                }
            }
        }


        //check if ship has left the labyrinth
        if (ship.x < - shipSize 
            || ship.x + shipSize > canvasWidth + shipSize 
            || ship.y < - shipSize 
            || ship.y + shipSize > canvasHeight + shipSize) 
        {
            ship.xSpeed = 0
            ship.ySpeed = 0
            dispatch("success")
            clearInterval(drawTimer)

        //check collision with any wall (failed)
        } else if (checkCollisions()) {
            ship.xSpeed = 0
            ship.ySpeed = 0
            dispatch("failed")
            clearInterval(drawTimer)
        }

        //move ship
        ship.ySpeed += acc * (keyboardManager.trust.down - keyboardManager.trust.up)
        ship.xSpeed += acc * (keyboardManager.trust.right - keyboardManager.trust.left)
        ship.x += ship.xSpeed
        ship.y += ship.ySpeed
    }

    //test if ship has collided with any of the walls
    function checkCollisions() {
        let collide = false
        currentTrack.walls.forEach(wall => {
            if (ship.x - 2.5 + shipSize > wall.x 
                && ship.x + 2.5 < wall.x + wall.w 
                && ship.y - 2.5 + shipSize > wall.y 
                && ship.y + 2.5 < wall.y + wall.h) 
            {
                collide = true
            }
        })
        return collide
    }

    //set pressed key in trust object to 1 
    function keyDownHandler(e) {
        keyboardManager.keyDownHandler(e.keyCode)
    }

    //set released key in trust object to 0
    function keyUpHandler(e) {
        keyboardManager.keyUpHandler(e.keyCode)
    }
    
</script>
<main>
    <div style="color: hsl({wallHue} 100% 50%);" class="top-text">Bane {currentTrackNr + 1}</div>
    <svg
        width={canvasWidth}
        height={canvasHeight}
        bind:this={svg}>

        <!-- background -->
        <rect class="bg" width={canvasWidth} height={canvasHeight} x="0" y="0" />

        <!-- walls -->
         {#each currentTrack.walls as wall}
            <rect x={wall.x} y={wall.y} width={wall.w} height={wall.h} fill={wallColor} />    
         {/each}

        <!-- ship -->
        <rect class="ship" x={ship.x + 5} y={ship.y + 5} width={shipSize - 10} height={shipSize - 10} />

        <!-- buttom flame -->
        <polygon points="
            {ship.x + shipSize / 2 - 10},{ship.y + shipSize - 2} 
            {ship.x + shipSize / 2},{ship.y + shipSize + Math.random() * 20 + 10}
            {ship.x + shipSize / 2 + 10},{ship.y + shipSize - 2}" 
            class="flame" 
            visibility={(keyboardManager.trust.up === 1 ) ? "visible" : "hidden"} />

        <!-- top flame -->
        <polygon points="
            {ship.x + shipSize / 2 - 10},{ship.y + 2}
            {ship.x + shipSize / 2},{ship.y - Math.random() * 20 - 10}
            {ship.x + shipSize / 2 + 10},{ship.y + 2}" 
            class="flame" 
            visibility={(keyboardManager.trust.down === 1 ) ? "visible" : "hidden"} />

        <!-- right side flame -->
        <polygon points="
            {ship.x + shipSize - 2},{ship.y + shipSize / 2 - 10}
            {ship.x + shipSize + Math.random() * 20 + 10},{ship.y + shipSize / 2}
            {ship.x + shipSize - 2},{ship.y + shipSize / 2 + 10}" 
            class="flame" 
            visibility={(keyboardManager.trust.left === 1 ) ? "visible" : "hidden"} />

        <!-- left side flame -->
        <polygon points="
            {ship.x + 2},{ship.y + shipSize / 2 - 10}
            {ship.x - Math.random() * 20 - 10},{ship.y + shipSize / 2}
            {ship.x + 2},{ship.y + shipSize / 2 + 10}" 
            class="flame" 
            visibility={(keyboardManager.trust.right === 1 ) ? "visible" : "hidden"} />
    </svg>
    <br>
</main>
<style>
    .bg {
        fill: #003300; 
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
    .top-text {
        width: 1000px;
        font-family: 'Courier New', Courier, monospace;
        font-size: 40px;
        font-weight: bolder;
        margin: 0;
        text-align: center;        
    }
</style>