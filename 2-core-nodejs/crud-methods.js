const { loadJson, saveJson } = require("./utils/jsonUtils");

async function getItems() {
  try {
    const jsonData = await loadJson();
    console.table(jsonData);
    return jsonData;
  } catch (error) {
    console.error("Error reading file: ", error);
  }
}

async function newItem(item) {
  try {
    const jsonData = await loadJson();
    const id = jsonData.length + 1;
    const newItem = {
      id,
      ...item,
    };
    jsonData.push(newItem);
    await saveJson(jsonData);
    console.log("Data successfully appended to the JSON file.");
  } catch (error) {
    console.error("Error appending to JSON file: ", error.message);
  }
}

async function updateItem(updatedItem) {
  try {
    const jsonData = await loadJson();
    const itemIndex = jsonData.findIndex((item) => item.id === updatedItem.id);

    if (itemIndex !== -1) {
      jsonData[itemIndex] = { ...jsonData[itemIndex], ...updatedItem };
      console.log(`Updated item with ID ${updatedItem.id}`);
      await saveJson(jsonData);
      console.log("File successfully updated.");
    } else {
      console.log(`Item with ID ${updatedItem.id} not found.`);
    }
  } catch (error) {
    console.error("Error updating the item selected!", error);
  }
}

async function getItemById(id) {
  try {
    const jsonData = await loadJson();
    const item = jsonData.filter((item) => item.id === id);
    if (item.length > 0) {
      return item;
    } else {
      console.log(`Item with ID ${id} does not exist!`);
    }
  } catch (error) {
    console.error(`Error occurred: ${error.message}`);
  }
}

async function deleteItem(id) {
  try {
    const jsonData = await loadJson();
    const filtered = jsonData.filter((item) => item.id !== id);
    console.log(filtered);

    await saveJson(filtered);
    console.log(`Successfuly deleted item with ID ${id}`);
  } catch (error) {
    console.error(`Error occurred: ${error.message}`);
  }
}

module.exports = {
  getItems,
  newItem,
  getItemById,
  updateItem,
  deleteItem,
};
