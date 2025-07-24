<script>
  import Game from "./Game.svelte";
  import { tracks } from "./Tracks";
  const numOfTracks = tracks.length;
  console.log("numOfTracks", numOfTracks)
  let gameState = "start"
  let trackNr = 0

  function success() {
	gameState = "success"
  }

  function failed() {
	gameState = "failed"
  }

  function nextTrack() {
	trackNr = (trackNr + 1) % numOfTracks
	gameState = "game"
  }

  function sameTrack() {
	gameState = "game"
  }

</script>
<main>
{#if gameState === "start"}
		<div class="start-div">
			<p class="text">Du skal styre det lille blå rumskib ud af labyrinten. Rører du væggene undervejs, dør du!<br><br>Brug piletasterne eller WASD til at styre rumskibet.</p>
			<br><br>
			<p class="text"><button class="big-btn" on:click={(e) => gameState = "game"}>Start spil</button></p>
		</div>
	{:else if gameState === "game" }
		<Game currentTrackNr = {trackNr} {numOfTracks} on:success={success} on:failed={failed}></Game>
	{:else if gameState === "failed"}
		<div class="text">Du døde!
			<br><br>
			<button on:click={sameTrack} class="big-btn">Prøv igen</button>
		</div>
	{:else if gameState === "success"}
		<div class="text">Du klarede det!
			<br><br>
			<button on:click={nextTrack}  class="big-btn">Næste bane</button>
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