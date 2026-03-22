const shopContainer = document.getElementById("shop-items");
const button = document.getElementById("click-btn");
const count = document.getElementById("click-count");


let itemsOwned = [];
let totalClickCount = 0;

const shopItems = [
  {
    name: "Jedi",
    description: "Click's for you! +5 Credits/sec",
    cost: 50,
    startingcost: 50,
  },
  
  {
    name: "Lightsaber",
    description: "Multiplies the value of each click by 2!",
    cost: 25,
    startingcost: 25,
  },
];


button.addEventListener("click", function () {
    buttonclick();
});

function createShopItems() {
  
  shopContainer.innerHTML = "";
  
  shopItems.forEach((item) => {
    const shopItem = document.createElement("div");
    shopItem.className = "shop-item";

    shopItem.innerHTML = `
      <div>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
      </div>
      <button onclick="buyItem('${item.name}')">
        Buy $${item.cost}
      </button>
    `;

    shopContainer.appendChild(shopItem);
  });
}


function buyItem(itemName) {
  const item = shopItems.find((i) => i.name === itemName);
  if (totalClickCount >= item.cost) {
    totalClickCount -= item.cost;
    count.textContent = totalClickCount;

    let amount = 1;


    const itemInArray = itemsOwned.find((obj) => obj.name === item.name);
    if (itemInArray) {
      itemInArray.amount++;
      console.log(`Found ${item.name}, added 1!`);
      amount = itemInArray.amount;
    } else {
      itemsOwned.push({ name: item.name, amount: 1 });
      console.log(`Added ${item.name} to itemsOwned!`);
    }

    console.log(`Bought ${itemName}!`);
  } else {
    console.log(`Not enough clicks! Need ${item.cost}`);
  }
}

setInterval(() => {
  const jediOwned = itemsOwned.find((i) => i.name === "Jedi");
  if (jediOwned) {
    for (let i = 0; i < jediOwned.amount; i++) {
      buttonclick();
    }
  }
}, 1000);

function buttonclick() {
  console.log("Button was clicked!");

  const multiplierOwned = itemsOwned.find((i) => i.name === "Multiplier");
  const multiplierCount = multiplierOwned ? multiplierOwned.amount : 0;
  
  totalClickCount = totalClickCount + 1 * 2 ** multiplierCount;

  count.textContent = totalclickcount;
}

function buyItem(itemName) {
  const item = shopItems.find((i) => i.name === itemName);
  if (totalClickCount >= item.cost) {
    totalClickCount -= item.cost;
    count.textContent = totalClickCount;

    let amount = 1;

    
    const itemInArray = itemsOwned.find((obj) => obj.name === item.name);
    if (itemInArray) {
      itemInArray.amount++;
      console.log(`Found ${item.name}, added 1!`);
      amount = itemInArray.amount;
    } else {
      itemsOwned.push({ name: item.name, amount: 1 });
      console.log(`Added ${item.name} to itemsOwned!`);
    }

    item.cost = item.startingCost + item.startingCost * amount ** 2;
    createShopItems();

    console.log(`Bought ${itemName}!`);
  } else {
    console.log(`Not enough clicks! Need ${item.cost}`);
  }
}

createShopItems();