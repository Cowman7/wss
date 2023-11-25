async function getPlayerTextureData(uuid) {
    const baseUrl = `http://localhost:5000/get_texture/${uuid}`;

    try {
        const response = await fetch(baseUrl);
        if (response.ok) {
            const profileData = await response.json();
            if ("properties" in profileData) {
                const properties = profileData.properties;
                const base64Data = atob(properties["0"].value);
                const textureData = JSON.parse(base64Data);
                if ("textures" in textureData) {
                    const textureUrl = textureData.textures.SKIN.url;
                    return textureUrl;
                }
            }
        } else {
            console.error("Response not OK");
        }
        return null;
    }
    catch (error) {
        console.error("Error fetching texture data:", error);
        return null;
    }
}

const uuid = 'd8b15caa845f47a0896e52e26699a930';
getPlayerTextureData(uuid)
    .then(textureUrl => {
        if (textureUrl) {
            const resultDiv = document.getElementById("player");
            resultDiv.innerHTML = `<img src="${textureUrl}" alt="Player Skin"/>`;
        } else {
            console.log("Texture data not found or error occurred.");
        }
    });

const armorDiv = document.querySelector('.armor-slots');
const offhandDiv = document.querySelector('.offhand-slot');
const inventoryDiv = document.querySelector('.inv-slots');
const hotbarDiv = document.querySelector('.hotbar-slots');
fetch('inventory.json')
    .then(response => response.json())
    .then(jsonData => {
	for (let i = 0; i <= 38; i++) {
            const slotData = jsonData.inventory[i];
            const itemDiv = document.createElement('div');
	    itemDiv.className = 'item';
            const itemImage = document.createElement('img');
            
            if (slotData === undefined) {
                itemImage.src = `/images/minecraft_items/air.png`
                itemDiv.appendChild(itemImage);
            } else {
                itemImage.src = `/images/minecraft_items/${slotData.Item}.png`
                itemImage.title = `${slotData.Item}`
                itemImage.id = `${i}`
                itemDiv.appendChild(itemImage);
                
                if (slotData.Amount > 1) {
                    const quantityDiv = document.createElement('div');
                    quantityDiv.className = 'quantity';
                    quantityDiv.textContent = slotData.Amount;
                    itemDiv.appendChild(quantityDiv);
                }
            }
            
            if (i < 9) {
                hotbarDiv.appendChild(itemDiv);
            } else if (i < 36) {
                inventoryDiv.appendChild(itemDiv);
            }
        }
        for (let i = 100; i <= 103; i++) {
            const slotData = jsonData.inventory[i];
            const itemDiv = document.createElement('div');
	    itemDiv.className = 'item';
            const itemImage = document.createElement('img');
            
            if (slotData === undefined) {
                itemImage.src = `/images/minecraft_items/air.png`
                itemDiv.appendChild(itemImage);
            } else {
                itemImage.src = `/images/minecraft_items/${slotData.Item}.png`
                itemImage.title = `${slotData.Item}`
                itemImage.id = `${i}`
                itemDiv.appendChild(itemImage);
            }
            armorDiv.insertBefore(itemDiv, armorDiv.firstChild);
        }
        const slotData = jsonData.inventory[-106];
        const itemDiv = document.createElement('div');
	itemDiv.className = 'item';
        const itemImage = document.createElement('img');
        if (slotData === undefined) {
            itemImage.src = `/images/minecraft_items/air.png`
            itemDiv.appendChild(itemImage);
        } else {
            itemImage.src = `/images/minecraft_items/${slotData.Item}.png`
            itemImage.title = `${slotData.Item}`
            itemImage.id = "-106"
            itemDiv.appendChild(itemImage);
        }
        offhandDiv.appendChild(itemDiv);
    })

    .catch(error => console.error('Error fetching JSON data:', error));