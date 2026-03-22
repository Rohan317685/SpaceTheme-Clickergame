const shopContainer = document.getElementById("shop-items");
const button = document.getElementById("click-btn");
const count = document.getElementById("click-count");


let itemsOwned = [];
let totalClickCount = 0;

const shopItems = [
  {
    name: "Lightsaber",
    description: "+1 to each click!",
    cost: 25,
    startingcost: 25,
    gives: 0,
  },
  {
    name: "Jedi",
    description: "Click's for you! +1 Credits/sec",
    cost: 50,
    startingcost: 50,
    gives: 1,
  },
  {
    name: "Anakin",
    description: "Click's for you! +5 Credits/sec",
    cost: 600,
    startingcost: 600,
    gives: 5,
  },
  {
    name: "Darth Vader",
    description: "Click's for you! +10 Credits/sec",
    cost: 5000,
    startingcost: 5000,
    gives: 10,
  },
  {
    name: "Darth Maul",
    description: "Click's for you! +50 Credits/sec",
    cost: 45000,
    startingcost: 45000,
    gives: 50,
  },
  {
    name: "Yoda",
    description: "Click's for you! +250 Credits/sec",
    cost: 90000,
    startingcost: 90000,
    gives: 250,
  },
];


button.addEventListener("click", function () {
    buttonclick();
});

function createShopItems() {
  shopContainer.innerHTML = "";
  
  shopItems.forEach((item) => {
    const itemInInventory = itemsOwned.find((i) => i.name === item.name);
    const amountOwned = itemInInventory ? itemInInventory.amount : 0;

    const shopItem = document.createElement("div");
    shopItem.className = "shop-item";

    shopItem.innerHTML = `
      <div>
        <h3>${item.name} <span class="owned-badge">x${amountOwned}</span></h3>
        <p>${item.description}</p>
      </div>
      <button onclick="buyItem('${item.name}')">
        Buy $${item.cost}
      </button>
    `;

    shopContainer.appendChild(shopItem);
  });
}


setInterval(() => {

  itemsOwned.forEach((ownedItem) => {
    const itemData = shopItems.find((s) => s.name === ownedItem.name);

    if (itemData && itemData.gives > 0){
      totalClickCount += (ownedItem.amount * itemData.gives)
    }
  });

  count.textContent = totalClickCount;
}, 1000);
  

function buttonclick() {
  console.log("Button was clicked!");

  const multiplierOwned = itemsOwned.find((i) => i.name === "Lightsaber");
  const multiplierCount = multiplierOwned ? multiplierOwned.amount : 0;
  
  totalClickCount = totalClickCount + (1 + multiplierCount);

  count.textContent = totalClickCount;
}

function buyItem(itemName) {
  const item = shopItems.find((i) => i.name === itemName);
  if (totalClickCount >= item.cost) {
    totalClickCount -= item.cost;
    count.textContent = totalClickCount;


    
    let itemInArray = itemsOwned.find((obj) => obj.name === item.name);
    
    
    if (itemInArray) {
      itemInArray.amount++;
      console.log(`Found ${item.name}, added 1!`);
  
    } else {
      
      const newItem = { name: item.name, amount: 1 };
      itemsOwned.push(newItem);
      itemInArray = newItem; 
      console.log(`Added ${item.name} to itemsOwned!`);
    }

    item.cost = Math.ceil(item.startingcost * Math.pow(1.5, itemInArray.amount));
    createShopItems();

    saveGame();

    console.log(`Bought ${itemName}!`);
  } else {
    console.log(`Not enough clicks! Need ${item.cost}`);
  }
}

createShopItems();

function saveGame() {
  const gameState = {
    credits: totalClickCount,
    inventory: itemsOwned,
    prices: shopItems.map(item => ({ name: item.name, cost: item.cost}))
  };
  localStorage.setItem("StarWarsClickerSave", JSON.stringify(gameState));
  console.log("Saved!");
}

function loadGame() {
  const savedData = localStorage.getItem("StarWarsClickerSave");
  
  if (savedData) { 
    const game = JSON.parse(savedData);

    totalClickCount = game.credits;
    count.textContent = Math.floor(totalClickCount);

    itemsOwned = game.inventory;

    game.prices.forEach(savedItem => {
      const itemInShop = shopItems.find(s => s.name === savedItem.name);
      if (itemInShop) {
        itemInShop.cost = savedItem.cost;
      }
    });
    
    
    createShopItems(); 
  }
}

loadGame();