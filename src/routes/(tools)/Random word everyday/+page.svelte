<script>

  let word = "";

  // random word function
  async function getWord() {
    const url = "https://random-word-api.herokuapp.com/word"; // RANDOM WORD API

    try {
      //fetching the word
      const defUrl = await fetch(url);
      const w = await defUrl.json();

      word = w; // set the fetched word to the variable "word"
    } catch (error) {
      console.log(error);
    }
  }

  getWord();
</script>

<div
  class="card gap-16 items-center mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 overflow-hidden rounded-lg"
>
  <!-- Add tool here -->

	 <h1>{word}</h1> <!--see the random word displayed in h1 tag-->
	 <button on:click={getWord}>See Another Word</button> <!--click this button to see another word-->


</div>

<style>
</style>
