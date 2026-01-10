const choiceHandler = require("./controller/choiceHandler");
const { io } = require("./utils/io");

function menu() {
  console.log("\n--- PERSONAL WISHLIST ---");
  console.log("1. List items");
  console.log("2. Add item");
  console.log("3. Update item");
  console.log("4. Delete item");
  console.log("5. Summary");
  console.log("6. Export CSV");
  console.log("7. Exit");
}

async function main() {
  let continueMenu = true;
  while (continueMenu) {
    menu();
    const choice = await io("Select any choice (1-7):  \n");
    continueMenu = await choiceHandler(choice);
  }
}

main();

// Show the most expensive item, average price, total cost, and the number of items.
