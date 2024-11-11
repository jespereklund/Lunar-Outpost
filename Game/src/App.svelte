<script>
  import { onMount } from "svelte"
  import Game from "./Game.svelte";
  let gameState = "start"
  let trackNr = 0

  onMount(async () => {
	//tracks = new Tracks()
  })

  function success() {
	setTimeout(e => {
		nextTrack()		
	}, 2000)
  }

  function failed() {
	setTimeout(e => {
		sameTrack()		
	}, 2000)	
  }

  function nextTrack() {

  }

  function sameTrack() {
	
  }

  function gotoTrack(track) {
	
  }
</script>
<main>
	<div style="display: flex; flex-direction: row;">
		{#each Array.from(Array(5).keys()) as track, i }
			<button on:click={e=>{gotoTrack(i)}} class="track-btn">{i+1}</button>
		{/each}
	</div>
{#if gameState === "start"}
		<div class="start-div">
			<p class="text">Du skal styre det lille blå rumskib ud af labyrinten. Rører du væggene undervejs, dør du!<br><br>Brug piletasterne eller WASD til at styre rumskibet.</p>
			<br><br>
			<p class="text"><button class="big-btn" on:click={(e) => gameState = "game"}>Start Game</button></p>
		</div>
	{:else if gameState === "game" }
		<Game on:success={success} on:failed={failed}></Game>
	{/if}
</main>

<style>

	.track-btn {
		width: 50px;
		height: 50px;
		font-family: 'Courier New', Courier, monospace;
		font-size: 30px;
		font-weight: bolder;
		color: #00ff00;
		background: #004400;
		border: 3px solid #00ff00;
		cursor: pointer;
	}

	.big-btn {
		width: 230px;
		height: 70px;
		font-family: 'Courier New', Courier, monospace;
		font-size: 30px;
		font-weight: bolder;
		color: #00ff00;
		background: #004400;
		border: 3px solid #00ff00;
		cursor: pointer;
	}

	.text {
		width: 900px;
		font-family: 'Courier New', Courier, monospace;
		font-size: 40px;
		font-weight: bolder;
		color: #009900;
		margin: 0;
		text-align: center;
	}

	.start-div {
		width: 1000px; 
		height: 600px; 
		background-color: #003300;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border: 10px solid #00ff00;
	}
	:global(body) {
		margin: 0;
		padding: 0;
		min-height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #333333;
	}  
</style>