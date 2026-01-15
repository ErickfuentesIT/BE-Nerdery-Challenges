const { loadJson } = require("./jsonUtils");

async function getSummary() {
  let jsonData = await loadJson();
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
