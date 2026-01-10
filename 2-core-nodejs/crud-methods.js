const fs = require("fs").promises;

const pathFile = "./data/wish-list.json";

async function getItems() {
  try {
    const data = await fs.readFile(pathFile, "utf-8");
    const jsonData = JSON.parse(data);
    console.table(jsonData);
    return jsonData;
  } catch (error) {
    console.error("Error reading file: ", error);
  }
}

async function newItem(item) {
  try {
    const fileContent = await fs.readFile(pathFile, { encoding: "utf-8" });
    const jsonData = JSON.parse(fileContent);
    const id = jsonData.length + 1;
    const newItem = {
      id,
      ...item,
    };
    jsonData.push(newItem);
    const updatedDataString = JSON.stringify(jsonData, null, 2);
    await fs.writeFile(pathFile, updatedDataString, { encoding: "utf-8" });
    console.log("Data successfully appended to the JSON file.");
  } catch (error) {
    console.error("Error appending to JSON file: ", error.message);
  }
}

async function updateItem(updatedItem) {
  try {
    const fileContent = await fs.readFile(pathFile, { encoding: "utf-8" });
    const jsonData = JSON.parse(fileContent);
    const itemIndex = jsonData.findIndex((item) => item.id === updatedItem.id);

    if (itemIndex !== -1) {
      jsonData[itemIndex] = { ...jsonData[itemIndex], ...updatedItem };
      console.log(`Updated item with ID ${updatedItem.id}`);

      const updatedJsonString = JSON.stringify(jsonData, null, 2);

      await fs.writeFile(pathFile, updatedJsonString, "utf-8");
      console.log("File successfully updated.");
    } else {
      console.log(`Item with ID ${updatedItem.id} not found.`);
    }
  } catch (error) {
    console.error("Error updating the item selected! ", error);
  }
}

async function getItemById(id) {
  try {
    const fileContent = await fs.readFile(pathFile, { encoding: "utf-8" });
    let jsonData = JSON.parse(fileContent);
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
    const fileContent = await fs.readFile(pathFile, { encoding: "utf-8" });
    let jsonData = JSON.parse(fileContent);
    const filtered = jsonData.filter((item) => item.id !== id);
    console.log(filtered);

    const updatedJsonString = JSON.stringify(filtered, null, 2);

    await fs.writeFile(pathFile, updatedJsonString, { encoding: "utf-8" });
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
