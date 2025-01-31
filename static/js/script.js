
        async function classifyReview() {
            const text = document.getElementById('reviewText').value.trim();
            if (!text) {
                alert('Please enter a review text');
                return;
            }

            // Send the text to your Python backend for classification
            const response = await fetch('/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: text })
            });
            const result = await response.json();
            displayResult(result);
        }
       
        function displayResult(result) {
            const resultDiv = document.getElementById('result');
            resultDiv.className = `result ${result.sentiment}`;

            let message = `Sentiment: ${result.sentiment.toUpperCase()}`;
            message += `<div class="confidence">Confidence: ${result.confidence}%</div>`;

            resultDiv.innerHTML = message;
            resultDiv.style.display = 'block';
        }

        function useSampleReview(type) {
            const sampleReviews = {
                positive: "This movie was absolutely fantastic! The acting was brilliant, and the storyline kept me engaged throughout. One of the best films I've seen this year.",
                negative: "What a disappointment. The plot was confusing, the acting was terrible, and I couldn't wait for it to end. Complete waste of time and money.",
                };
            
            document.getElementById('reviewText').value = sampleReviews[type];
        }
