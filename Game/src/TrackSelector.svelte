<script>
    import { onMount, onDestroy } from "svelte"
    import { tracks } from "./Tracks"
    import { createEventDispatcher } from "svelte"

    const trackScale = 0.2
    const canvasWidth = 200
    const canvasHeight = 120
    const wallSpeed = 0.25
    const drawTime = 20

    let drawTimer

    let tracksCopy

    const dispatch = createEventDispatcher()

    onMount(async () => {
        tracksCopy = [...tracks]
        drawTimer = setInterval(nextFrame, drawTime)
    })

    onDestroy(async () => {
        clearInterval(drawTimer)
    })
            
    function selectTrack(index) {
        dispatch("select", {trackNr: index})
    }

    function nextFrame() {
        tracksCopy = [...tracks] 
        tracksCopy.forEach((track) => {

            //move walls if moxeX or moveY is declared in Tracks.js walls
            for(let i=0; i<track.walls.length; i++) {

                //move x-axis
                if (track.walls[i].moveX != undefined) {
                    if(track.walls[i].moveX.dir === 1) {
                        if(track.walls[i].x < track.walls[i].moveX.xMax) {
                            track.walls[i].x += wallSpeed
                        } else {
                            track.walls[i].moveX.dir = -1
                        }

                    } else if (track.walls[i].moveX.dir === -1) {
                        if(track.walls[i].x > track.walls[i].moveX.xMin) {
                            track.walls[i].x -= wallSpeed
                        } else {
                            track.walls[i].moveX.dir = +1
                        }

                    }
                }

                //move y-axis
                if (track.walls[i].moveY != undefined) {
                    if(track.walls[i].moveY.dir === 1) {
                        if(track.walls[i].y < track.walls[i].moveY.yMax) {
                            track.walls[i].y += wallSpeed
                        } else {
                            track.walls[i].moveY.dir = -1
                        }
                    } else if (track.walls[i].moveY.dir === -1) {
                        if(track.walls[i].y > track.walls[i].moveY.yMin) {
                            track.walls[i].y -= wallSpeed
                        } else {
                            track.walls[i].moveY.dir = +1
                        }
                    }
                }
            }        
        })        
    }
</script>
<main>
    <div class="select-div">
        <p class="text">Her kan du vælge bane</p>
        <br>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 30px 15px;">

        {#each tracksCopy as track, index}
            <button style="background-color: transparent; border: none; cursor: pointer;" on:click={e => {selectTrack(index)}}>
                <div style="width: {canvasWidth}px; height: {canvasHeight}px;">
                    <p class="text-small">{track.name}</p>

                    <svg width={canvasWidth} height={canvasHeight}>

                        <!-- background -->
                        <rect 
                            style="fill: #002200;" 
                            width={canvasWidth} 
                            height={canvasHeight} 
                            x="0" 
                            y="0" 
                        />

                        <!-- walls -->
                        {#each track.walls as wall}
                            <rect 
                                x={trackScale * wall.x} 
                                y={trackScale * wall.y} 
                                width={trackScale * wall.w} 
                                height={trackScale * wall.h} 
                                fill={"hsl(" + 365 * (index / tracksCopy.length) + ", 100%, 50%)"} 
                            />    
                        {/each}
                    </svg>
                </div>         
            </button>
        {/each}
        </div>
    </div>
</main>

<style>
	.text {
		width: 900px;
		font-family: 'Courier New', Courier, monospace;
		font-size: 40px;
		font-weight: bolder;
		color: #00ff00;
		margin: 0;
		text-align: center;
	}

	.text-small {
		font-family: 'Courier New', Courier, monospace;
		font-size: 16px;
		font-weight: bolder;
		color: #009900;
		margin: 0;
		text-align: center;
	}    

	.select-div {
		width: 1000px; 
		height: 600px; 
		background-color: #003300;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border: 10px solid #00ff00;
	}    
</style>