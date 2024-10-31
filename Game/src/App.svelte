<script>
  import Game from "./Game.svelte";
  import GameSvg from "./GameSvg.svelte";
  let gameState = "start"
</script>
<main>
	{#if gameState === "start"}
		<div class="start-div">
			<p class="text">Du skal styre det lille blå rumskib ud af labyrinten. Rører du væggene undervejs, dør du!<br><br>Brug piletasterne eller WASD til at styre rumskibet.</p>
			<br><br>
			<p class="text"><button on:click={(e) => gameState = "game"}>Start Game</button></p>
		</div>
	{:else if gameState === "game" }
		<!-- Game></Game -->
		<GameSvg></GameSvg>
	{/if}
</main>

<style>

	button {
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
		font-family: 'Courier New', Courier, monospace;
		font-size: 40px;
		font-weight: bolder;
		color: #009900;
		margin: 0;
		text-align: center;
	}

	.start-div {
		width: 800px; 
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