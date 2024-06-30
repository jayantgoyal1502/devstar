<script lang="ts">
	let timer = true;
	let stopWatch = false;

	function selectTimer(){
		console.log("Timer button");
		timer = true;
		stopWatch = false;
	}
	function selectStopWatch(){
		console.log("StopWatch button");
		timer = false;
		stopWatch = true;
	}
	
</script>

<div class="card gap-16 items-center mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 overflow-hidden rounded-lg">
	<!-- Add tool here -->
</div>

<div class="flex space-x-4 justify-center my-10">
	<button class="SelectButton bg-gray-800 text-white" on:click={selectTimer}> Timer </button>
	<button class="SelectButton bg-gray-800 text-white" on:click={selectStopWatch}> Stop Watch </button>
</div>

<div class="bg-gray-800 text-white justify-center">
	{#if timer}
		<p> Timer Code </p>
	{:else}
		<p> StopWatch Code </p>
	{/if}
</div>

<style>
	.SelectButton {
		display: flex;
		justify-content: center;
		gap: 10px;
		margin-bottom: 20px;
	}

	button {
		padding: 10px 20px;
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		transition: background-color 0.3s;
	}

	button:hover {
		background-color: #0056b3;
	}
</style>