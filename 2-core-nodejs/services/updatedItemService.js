const operations = require("./../crud-methods");
const { io } = require("./../utils/io");

async function updateItemService() {
  try {
    console.clear();
    await operations.getItems();
    const id = await io("**Select which item ID you want to update:  \n");
    const originalItem = await operations.getItemById(Number(id));
    if (originalItem.length > 0) {
      const updatedName = await io(
        `**Write a new name for this item (${originalItem[0].name}):  \n`,
      );
      const updatedPrice = await io(
        `**Write a new price for this item (${originalItem[0].price}):  \n`,
      );
      const updatedStore = await io(
        `**Write a new store for this item (${originalItem[0].store}):  \n`,
      );

      const newItem = {
        id: originalItem[0].id,
        name: updatedName || originalItem[0].name,
        price: Number(updatedPrice) || Number(originalItem[0].price),
        store: updatedStore || originalItem[0].store,
      };
      operations.updateItem(newItem);
    } else {
      console.error(`The item with id ${id} was not found!`);
    }
  } catch (error) {
    console.error("An error happeed! ", error.message);
  } finally {
    return true;
  }
}

module.exports = updateItemService;
