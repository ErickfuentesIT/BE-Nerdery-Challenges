const operations = require("./../crud-methods");
const { io } = require("./../utils/io");

async function addItemService() {
  console.clear();
  const name = await io("**Write a name for your wish item:  \n");
  const price = await io("**Add a price for your wish item:  \n");
  const store = await io("**Add a store for your wish item:  \n");

  const item = {
    name,
    price: Number(price),
    store,
  };
  await operations.newItem(item);
}

module.exports = addItemService;
