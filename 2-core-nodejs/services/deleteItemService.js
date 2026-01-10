const operations = require("./../crud-methods");
const {io} = require("./../utils/io");

async function deleteItemService() {
  try {
    console.clear();
    await operations.getItems();
    const id = await io("**Select which item ID you want to delete:  \n");
    await operations.deleteItem(Number(id));
  } catch (error) {
    console.error("An error happeed! ", error.message);
  }
}

module.exports = deleteItemService;
