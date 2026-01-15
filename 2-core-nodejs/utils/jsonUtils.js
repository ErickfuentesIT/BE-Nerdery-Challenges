const fs = require("fs").promises;

const pathFile = "./data/wish-list.json";
const encoding = "utf-8";

async function loadJson() {
  try {
    const data = await fs.readFile(pathFile, encoding);
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (error) {
    console.log("Something when wrong loading JSON File: ", error.message);
  }
}

async function saveJson(jsonData) {
  try {
    const jsonString = JSON.stringify(jsonData, null, 2);
    await fs.writeFile(pathFile, jsonString, encoding);
  } catch (error) {
    console.log("Something when wrong saving JSON File: ", error.message);
  }
}

module.exports = { loadJson, saveJson };
