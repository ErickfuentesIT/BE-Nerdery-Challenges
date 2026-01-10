const fs = require("fs").promises;

const pathFile = "./data/wish-list.json";

async function createCsvFile() {
  try {
    const fileContent = await fs.readFile(pathFile, { encoding: "utf-8" });
    let jsonData = JSON.parse(fileContent);

    const csvContent = jsonData.reduce((text, item) => {
      text += `${item.id},${item.name},${item.price},${item.store}\n`;
      return text;
    }, "id,name,price,store\n");

    const outputPath = `./output/wishlist-${new Date().getTime()}.csv`;

    await fs.writeFile(outputPath, csvContent, { encoding: "utf-8" });
    console.log("File written successfully to ", outputPath);
  } catch (error) {
    console.error("Something went wrong creating the CSV file ", error.message);
  }
}
module.exports = createCsvFile;
