<script>
  import { onMount } from "svelte"
  import Game from "./Game.svelte"
  import { tracks } from "./Tracks"
  import TrackSelector from "./TrackSelector.svelte"

  const numOfTracks = tracks.length
  let gameState = "start"
  let trackNr = 0

  onMount(async () => {
	document.onkeydown = onkeydownHandler
  })

  function onkeydownHandler(e) {
	if (e.keyCode === 13) {
		if (gameState === "failed") {
			sameTrack()
		}

		if (gameState === "success") {
			nextTrack()
		}
	}
  }

  function success() {
	gameState = "success"
	document.onkeydown = onkeydownHandler
  }

  function failed() {
	gameState = "failed"
	document.onkeydown = onkeydownHandler
  }

  function nextTrack() {
	trackNr = (trackNr + 1) % numOfTracks
	gameState = "game"
  }

  function sameTrack() {
	gameState = "game"
  }

  function selectTrack(evt) {
	trackNr = evt.detail.trackNr
	gameState = "game"
  }

</script>
<main>
{#if gameState === "start"}
		<div class="start-div">
			<p class="text">Du skal styre det lille blå rumskib ud af labyrinten. Rører du væggene undervejs, dør du!
				<br><br>Brug piletasterne eller WASD til at styre rumskibet.</p>
			<br><br>
			<p class="text"><button class="big-btn" on:click={(e) => gameState = "game"}>Start spil</button></p>
			<br><br>
			<p class="text"><button class="big-btn" on:click={(e) => gameState = "select"}>Vælg bane</button></p>
		</div>
	{:else if gameState === "select" }	
		<TrackSelector on:select={selectTrack} />
	{:else if gameState === "game" }
		<Game currentTrackNr = {trackNr} {numOfTracks} on:success={success} on:failed={failed}></Game>
	{:else if gameState === "failed"}
		<div class="text">Du døde!
			<br><br>
			<button on:click={sameTrack} class="big-btn">Prøv igen</button>
			<br><br>
			<div class="text">(press Enter)</div>
		</div>
	{:else if gameState === "success"}
		<div class="text">Du klarede det!
			<br><br>
			<button on:click={nextTrack} class="big-btn">Næste bane</button>
			<br><br>
			<div class="text">(press Enter)</div>
		</div>
	{/if}
</main>

<style>
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