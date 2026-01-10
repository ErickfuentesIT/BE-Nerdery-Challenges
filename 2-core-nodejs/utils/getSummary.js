const fs = require("fs").promises;

const pathFile = "./data/wish-list.json";

async function getSummary() {
  const fileContent = await fs.readFile(pathFile, { encoding: "utf-8" });
  let jsonData = JSON.parse(fileContent);
  const mostExpensiveItem = Math.max(...jsonData.map((item) => item.price));
  const totalPrice = jsonData.reduce(
    (total, currentValue) => total + currentValue.price,
    0,
  );
  const itemQuantity = jsonData.length;

  const averagePrice = totalPrice / itemQuantity;

  const summary = {
    mostExpensiveItem,
    averagePrice,
    totalCost: totalPrice,
    numberOfItems: itemQuantity,
  };

  console.table(summary);
}

module.exports = getSummary;
