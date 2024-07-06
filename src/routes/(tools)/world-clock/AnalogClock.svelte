<script>
    import { onMount } from 'svelte';
    import { timeZoneList } from './locale.js';
  
    export let city = '';
    export let country = '';
    export let timezone = '';
  
    let canvas;
    let isDropdownOpen = false;
    let selectedTimezone = timezone;
  
    onMount(() => {
      updateClock();
      const interval = setInterval(updateClock, 1000);
      return () => clearInterval(interval);
    });
  
    function updateClock() {
      const date = new Date(new Date().toLocaleString("en-US", { timeZone: selectedTimezone }));
      const second = date.getSeconds();
      const minute = date.getMinutes();
      const hour = date.getHours();
  
      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;
  
      ctx.clearRect(0, 0, width, height);
  
      // Draw clock face
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, width / 2 - 10, 0, 2 * Math.PI);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.strokeStyle = '#000';
      ctx.stroke();
  
      // Draw hour marks
      for (let i = 0; i < 12; i++) {
        ctx.beginPath();
        ctx.moveTo(width / 2, height / 2);
        ctx.lineTo(width / 2 + (width / 2 - 20) * Math.cos((i * 30 - 90) * Math.PI / 180), height / 2 + (height / 2 - 20) * Math.sin((i * 30 - 90) * Math.PI / 180));
        ctx.stroke();
      }
  
      // Draw minute marks
      for (let i = 0; i < 60; i++) {
        if (i % 5 !== 0) {
          ctx.beginPath();
          ctx.moveTo(width / 2, height / 2);
          ctx.lineTo(width / 2 + (width / 2 - 15) * Math.cos((i * 6 - 90) * Math.PI / 180), height / 2 + (height / 2 - 15) * Math.sin((i * 6 - 90) * Math.PI / 180));
          ctx.stroke();
        }
      }
  
      ctx.translate(width / 2, height / 2);
      ctx.rotate(-Math.PI / 2);
  
      // Draw hour hand
      ctx.save();
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.rotate((Math.PI / 6) * (hour % 12 + minute / 60));
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -height / 4);
      ctx.stroke();
      ctx.restore();
  
      // Draw minute hand
      ctx.save();
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.rotate((Math.PI / 30) * (minute + second / 60));
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -height / 3);
      ctx.stroke();
      ctx.restore();
  
      // Draw second hand
      ctx.save();
      ctx.strokeStyle = '#FF0000';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.rotate((Math.PI / 30) * second);
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -height / 2.2);
      ctx.stroke();
      ctx.restore();
  
      ctx.rotate(Math.PI / 2);
      ctx.translate(-width / 2, -height / 2);
    }
  
    function toggleDropdown() {
      isDropdownOpen = !isDropdownOpen;
    }
  
    function handleTimezoneSelect(locale) {
      selectedTimezone = locale;
      updateClock();
      isDropdownOpen = false; // Close dropdown after selection
    }
  </script>
  
  <div class="flex flex-col items-center mb-4">
    <canvas bind:this={canvas} id="{city.replace(/\s+/g, '-')}" width="200" height="200" class="mb-2"></canvas>
    <div class="text-lg">{city}, {country}</div>
    <div class="mt-2 relative">
      <div class="relative">
        <button type="button" class="bg-gray-200 p-2 rounded-md" on:click={toggleDropdown}>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        {#if isDropdownOpen}
          <div class="absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 overflow-y-auto max-h-60">
            <div class="py-1">
              {#each timeZoneList as locale}
                <button
                  type="button"
                  class="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  on:click={() => handleTimezoneSelect(locale)}
                >
                  {locale}
                </button>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
  
  <style>
    canvas {
      background: white;
      border-radius: 50%;
    }
  </style>
  