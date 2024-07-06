<script>
	import { onMount } from 'svelte';
    import { timeZoneList } from './locale.js';
    import AnalogClock from './AnalogClock.svelte';
  
    let timezones = [
      'America/New_York', // New York, USA
      'Europe/London',    // London, UK
      'Asia/Tokyo',       // Tokyo, Japan
      'Australia/Sydney'  // Sydney, Australia
    ];
  
    let selectedTimezone = '';
    let currentTime = ''; // Initialize currentTime
  
    onMount(() => {
      selectedTimezone = timezones[0]; // Default to the first timezone
      setInterval(updateClocks, 1000); // Update clocks every second
    });
  
    function updateClocks() {
      const date = new Date().toLocaleTimeString('en-US', { timeZone: selectedTimezone });
      currentTime = date; // Update currentTime every second
    }
  
    function handleTimezoneChange(event) {
      selectedTimezone = event.target.value;
    }
</script>

<div class="card gap-16 items-center mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 overflow-hidden rounded-lg">
	<!-- Add tool here -->
	<div class="border-yellow-500 border-4 p-4 w-full">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-xl font-bold">{selectedTimezone}</h1>
        <div class="select">
          <select name="locales" id="list" bind:value={selectedTimezone} on:change={handleTimezoneChange} class="p-2 border rounded">
            {#each timeZoneList.sort() as locale}
              <option value={locale}>{locale}</option>
            {/each}
          </select>
        </div>
      </div>
      <p class="show-date text-lg">{currentTime}</p>
    </div>
</div>

<div class="flex justify-around items-center border-yellow-500 border-4 p-4 mt-4">
    {#each timezones as timezone}
      <AnalogClock {timezone} />
    {/each}
</div>

<style>

</style>