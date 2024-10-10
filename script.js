document.addEventListener("DOMContentLoaded", function () {
    fetch('APISyPago.json')
        .then(response => response.json())
        .then(data => {
            const dataDisplay = document.getElementById("dataDisplay");

            // Create HTML elements to display the JSON data
            const nameElement = document.createElement("p");
            nameElement.textContent = "Link: " + data.response;
        
            dataDisplay.appendChild(nameElement);
 
        })
        .catch(error => console.error("Error fetching JSON data:", error));
});
