<script>
    let word = "";
    let definition = "";
    let quote = "";
    let showQuote = false; 
    let loading = false;
    let error = "";
    let lastType = "noun"; // Default to noun initially

    // Function to fetch a random word and its definition
    async function getWord(type) {
        const url = "https://random-word-api.herokuapp.com/word";
        const definitionUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";
        let retries = 0;
        const maxRetries = 10;

        loading = true;
        word = "";
        definition = "";
        quote = ""; // Clear quote 
        showQuote = false; 
        lastType = type;

        while (retries < maxRetries) {
            try {
                // Fetching the word
                const wordResponse = await fetch(url);
                const wordData = await wordResponse.json();
                const fetchedWord = wordData[0];

                // Fetching the definition
                const responseDef = await fetch(`${definitionUrl}${fetchedWord}`);
                const dataDef = await responseDef.json();

                if (dataDef.title === "No Definitions Found") {
                    definition = "No definition found for this word.";
                } else {
                    const meanings = dataDef[0].meanings;
                    const foundMeaning = meanings.find(meaning => meaning.partOfSpeech === type);
                    if (foundMeaning) {
                        word = fetchedWord;
                        definition = foundMeaning.definitions[0].definition;
                        break;
                    }
                }
            } catch (error) {
                console.log(error);
                error = "Could not fetch a word or its definition.";
            }
            retries++;
        }

        if (!word) {
            word = `Couldn't find a ${type} after ${maxRetries} attempts.`;
            definition = "";
        }

        loading = false;
    }

    // Function to fetch random adjectives
    async function getAdjective() {
        const url = "https://a883c9d9-d3f7-44a6-9d0b-f5f43c0d5931.mock.pstmn.io";

        loading = true;
        word = "";
        definition = "";
        quote = ""; // Clear quote 
        showQuote = false; 

        try {
            const response = await fetch(url);
            const data = await response.json();

            // Assuming the API returns an array of objects with 'word' and 'description'
            if (data && data.length > 0) {
                const randomIndex = Math.floor(Math.random() * data.length);
                word = data[randomIndex].word;
                definition = data[randomIndex].description;
            } else {
                word = `No adjectives found.`;
                definition = "";
            }
        } catch (error) {
            console.log(error);
            error = "Could not fetch adjectives.";
        }

        loading = false;
    }

    // Fetch another word of the last selected type
    async function getAnotherWord() {
        if (lastType) {
            await getWord(lastType);
        }
    }

    // Function to fetch a random quote
    async function getQuote() {
        loading = true;
        word = ""; // Clear word 
        definition = ""; // Clear definition 
        quote = "";
        showQuote = false; // Reset visibility
        try {
            const response = await fetch("https://api.quotable.io/random");
            const data = await response.json();
            quote = data.content;
            showQuote = true; // Show quote
        } catch (error) {
            console.log(error);
            error = "Could not fetch a quote.";
        }
        loading = false;
    }
</script>

<div class="card gap-16 items-center mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 overflow-hidden rounded-lg">
    <div class="container">
        <button on:click={getAnotherWord}>Another Word</button>
        <button on:click={() => getWord('noun')}><u>Noun</u></button>
        <button on:click={() => getWord('verb')}><u>Verb</u></button>
        <button on:click={() => getAdjective()}><u>Adjective</u></button>
        <button on:click={() => getQuote()}><u>Quote</u></button>
        <h1 class:loading={loading} class:noun={lastType === 'noun'} class:verb={lastType === 'verb'} class:adjective={lastType === 'adjective'}>
            {loading ? 'Loading...' : word}
        </h1>
        {#if !loading && definition}
            <h3 class:loading={loading} class:noun={lastType === 'noun'} class:verb={lastType === 'verb'} class:adjective={lastType === 'adjective'}>
                {definition}
            </h3>
        {/if}
        {#if !loading && showQuote}
            <h3 class:loading={loading}>
                {quote}
            </h3>
        {/if}
    </div>
</div>

<style>
    .container {
        text-align: center;
        margin-top: 50px;
    }
    button {
        margin: 10px;
        color: white;
    }
    h1, h3 {
        margin: 20px 0;
        color: lightblue;
    }
    .loading {
        color: white;
    }
    .noun {
        color: lightblue;
    }
    .verb {
        color: lightblue;
    }
    .adjective {
        color: lightblue;
    }
</style>