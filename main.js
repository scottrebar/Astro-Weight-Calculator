document.addEventListener('DOMContentLoaded', function () {
    // Weight conversion factors (relative to Earth's gravity)
    let planetList = [
        ['Pluto', 0.06],
        ['Neptune', 1.148],
        ['Uranus', 0.917],
        ['Saturn', 1.139],
        ['Jupiter', 2.64],
        ['Mars', 0.3895],
        ['Moon', 0.1655],
        ['Earth', 1],
        ['Venus', 0.9032],
        ['Mercury', 0.377],
        ['Sun', 27.9],
    ];

    // Populate the dropdown element with planet names
    function populateDropdown() {
        const dropdown = document.getElementById('planets');
        dropdown.innerHTML = ''; // Clear existing options

        const defaultOption = document.createElement('option');
        defaultOption.value = "";
        defaultOption.textContent = "Select a Planet";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        dropdown.appendChild(defaultOption);

        planetList.forEach(([planetName]) => {
            const option = document.createElement('option');
            option.value = planetName;
            option.textContent = planetName;
            dropdown.appendChild(option);
        });

        // Add custom planet option
        const customOption = document.createElement('option');
        customOption.value = "custom";
        customOption.textContent = "Celestial body not listed";
        dropdown.appendChild(customOption);
    }

    // Calculate the new weight based on user input
    function calculateWeight(weight, planetName) {
        const planetWeight = planetList.find(([name]) => name === planetName)[1];
        return weight * planetWeight;
    }

    // Handle button click event
    function handleClickEvent() {
        const userWeight = parseFloat(document.getElementById('user-weight').value);
        //console.log('userWeight: ', userWeight)
        const planetDropdown = document.getElementById('planets');
        const selectedPlanet = planetDropdown.value;
        //console.log('selectedPlanet: ', selectedPlanet);
        if (!isNaN(userWeight) && selectedPlanet !== "") {
            if (selectedPlanet === "custom") {
                // Handle custom planet selection
                handleCustomPlanetSelection();
            } else {
                const calculatedWeight = calculateWeight(userWeight, selectedPlanet);
                const article = selectedPlanet === 'Sun' || selectedPlanet === 'Moon' ? 'the' : '';
                const outputElement = document.getElementById('output');
                outputElement.textContent = `If you were on ${article} ${selectedPlanet}, you would weigh ${calculatedWeight.toFixed(2)} lbs.`;
            }
        } else {
            alert ("Well that doesn't look quite right... no, don't be sorry, be better. Now, try it again... and make your mom and I proud!");
        }
    }

    // Set the #calculate-button element's onclick method
    document.getElementById('calculate-button').addEventListener('click', handleClickEvent);

    // Bonus Challenge: Reverse the dropdown order
    planetList.reverse();
    populateDropdown();

    // Handle dropdown change event
    document.getElementById('planets').addEventListener('change', function() {
        const selectedPlanet = this.value;
        this.options[0].textContent = selectedPlanet ? selectedPlanet : "Select a Planet";
    });

    // Create checkbox and label elements
    const plutoCheckbox = document.createElement('input');
    plutoCheckbox.type = 'checkbox';
    plutoCheckbox.id = 'remove-pluto';

    const plutoLabel = document.createElement('label');
    plutoLabel.htmlFor = 'remove-pluto';
    plutoLabel.textContent = "NASA said Pluto isn't big enough to be a planet.";

    // Append checkbox and label to the DOM
    const container = document.querySelector('.container');
    container.insertBefore(plutoLabel, document.getElementById('output'));
    container.insertBefore(plutoCheckbox, plutoLabel);

    // Handle checkbox change event
    plutoCheckbox.addEventListener('change', function () {
        if (this.checked) {
            // Remove Pluto from the planets array
            planetList = planetList.filter(([planetName]) => planetName !== 'Pluto');
            plutoLabel.textContent = 'But your mom thought it was big enough.'; // Update label text
        } else {
            // Add Pluto back to the planets array
            planetList.push(['Pluto', 0.06]);
            plutoLabel.textContent = "NASA said Pluto isn't big enough to be a planet."; // Reset label text
        }

        // Repopulate the dropdown with the updated planets array
        populateDropdown();
    });

    // Function to handle custom planet selection
    function handleCustomPlanetSelection() {
        // Create input fields for custom planet name and weight multiplier
        const customPlanetNameInput = document.createElement('input');
        customPlanetNameInput.type = 'text';
        customPlanetNameInput.id = 'custom-planet-name';
        customPlanetNameInput.placeholder = 'Planet Name';

        const customPlanetWeightInput = document.createElement('input');
        customPlanetWeightInput.type = 'number';
        customPlanetWeightInput.id = 'custom-planet-weight';
        customPlanetWeightInput.placeholder = 'Weight Multiplier';

        // Create button to add custom planet
        const addCustomPlanetButton = document.createElement('button');
        addCustomPlanetButton.textContent = 'Add Planet';

        // Append input fields and button to the DOM
        const container = document.querySelector('.container');
        container.appendChild(customPlanetNameInput);
        container.appendChild(customPlanetWeightInput);
        container.appendChild(addCustomPlanetButton);

        // Add event listener to button
        addCustomPlanetButton.addEventListener('click', function() {
            const customPlanetName = customPlanetNameInput.value.trim();
            const customPlanetWeight = parseFloat(customPlanetWeightInput.value);

            // Validate input values
            if (customPlanetName === "" || isNaN(customPlanetWeight)) {
                alert("Please enter a valid planet name and weight multiplier.");
                return;
            }

            // Add custom planet to planets array
            planetList.push([customPlanetName, customPlanetWeight]);

            // Repopulate the dropdown with the updated planets array
            populateDropdown();

            // Remove input fields and button from the DOM
            container.removeChild(customPlanetNameInput);
            container.removeChild(customPlanetWeightInput);
            container.removeChild(addCustomPlanetButton);
        });
    }
});
