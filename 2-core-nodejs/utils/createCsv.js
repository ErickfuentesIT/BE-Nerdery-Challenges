const fs = require("fs").promises;
const { loadJson } = require("./jsonUtils");

const encoding = "utf-8";

async function createCsvFile() {
  try {
    const jsonData = await loadJson();
    const csvContent = jsonData.reduce((text, item) => {
      text += `${item.id},${item.name},${item.price},${item.store}\n`;
      return text;
    }, "id,name,price,store\n");

    const outputPath = `./output/wishlist-${new Date().getTime()}.csv`;

    await fs.writeFile(outputPath, csvContent, encoding);
    console.log("File written successfully to ", outputPath);
  } catch (error) {
    console.error("Something went wrong creating the CSV file ", error.message);
  }
}
module.exports = createCsvFile;
