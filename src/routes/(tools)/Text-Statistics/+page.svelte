<script>
  let text = '';
  let wordCount = 0;
  let charCount = 0;
  let sentenceCount = 0;
  let paragraphCount = 0;
  let avgWordLength = 0;
  let readingTime = 0;
  let uniqueWords = 0;
  let showStats = false;
  let wordLengthCounts = [];
  function calculateStatistics() {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    wordCount = words.length;
    charCount = text.length;
    sentenceCount = text.split(/[.!?]+\s*/).filter(Boolean).length;
    paragraphCount = text.split(/\n+/).filter(paragraph => paragraph.trim().length > 0).length;
    avgWordLength = (words.reduce((sum, word) => sum + word.length, 0) / wordCount) || 0;
    readingTime = (wordCount / 200).toFixed(2); // Assuming average reading speed of 200 wpm
    uniqueWords = new Set(words.map(word => word.toLowerCase())).size;
    showStats = true;
    // Calculate word length counts
    wordLengthCounts = Array(9).fill(0); // Initialize counts for words lengths 2-10
    words.forEach(word => {
      if (word.length >= 2 && word.length <= 10) {
        wordLengthCounts[word.length - 2]++;
      }
    });
  }
</script>
