document.addEventListener("DOMContentLoaded", async () => {
    const imgElement = document.getElementById("image");
    const apiUrl = "https://api.football-data.org/v4/matches";
    const apiToken = "4a6fd3eb9c08420ca88aa28cf7750995";

    try {
        const response = await fetch(apiUrl, {
            headers: {
                "X-Auth-Token": apiToken
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        
        // Display API response in console for debugging
        console.log("API Response:", data);
        
        // Since football APIs typically don't return images directly,
        // we'll use a placeholder or extract team crests
        if (data.matches && data.matches.length > 0) {
            const firstMatch = data.matches[0];
            // Try to get home team crest if available
            const crestUrl = firstMatch.homeTeam?.crest || 
                            "https://via.placeholder.com/300x200?text=Football+Match";
            imgElement.src = crestUrl;
            imgElement.alt = firstMatch.homeTeam?.name || "Football Team Crest";
        } else {
            imgElement.src = "https://via.placeholder.com/300x200?text=No+Matches+Found";
            imgElement.alt = "No matches available";
        }
    } catch (error) {
        console.error("API request failed:", error);
        imgElement.src = "https://via.placeholder.com/300x200?text=Error+Loading+Data";
        imgElement.alt = "Error loading football data";
        
        // Display error message on page
        const errorMsg = document.createElement("p");
        errorMsg.textContent = "Error loading football data. Please check console for details.";
        errorMsg.style.color = "red";
        document.querySelector(".container").appendChild(errorMsg);
    }
});