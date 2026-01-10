const addItemService = require("./../services/addItemService");
const deleteItemService = require("./../services/deleteItemService");
const updateItemService = require("./../services/updatedItemService");
const createCsv = require("./../utils/createCsv");
const getSummary = require("./../utils/getSummary");
const { rl } = require("./../utils/io");
const operations = require("./../crud-methods");

async function choiceHandler(choice) {
  switch (choice) {
    case "1":
      console.clear();
      await operations.getItems();
      break;
    case "2":
      console.clear();
      await addItemService();
      break;
    case "3":
      console.clear();
      await updateItemService();
      console.log("UPDATE ITEM");
      break;
    case "4":
      console.clear();
      await deleteItemService();
      console.log("DELETE ITEM");
      break;
    case "5":
      console.clear();
      await getSummary();
      console.log("SUMMARY");
      break;
    case "6":
      console.clear();
      await createCsv();
      console.log("EXPORT CSV");
      break;
    case "7":
      console.log("EXIT");
      rl.close();
      return false;
    default:
      console.log("Invalid choice. Try again!");
  }
  return true;
}

module.exports = choiceHandler;
