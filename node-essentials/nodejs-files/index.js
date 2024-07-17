const fs = require("fs").promises;
const path = require("path");
async function calculateSalesTotal(salesFiles) {
  let salesTotal = 0;
  for (file of salesFiles) {
    const fileContents = await fs.readFile(file);
    const data = JSON.parse(fileContents);
    salesTotal += data.total;
  }
  return salesTotal;
}

async function findSalesFiles(folderName) {

  // (1) Add an array at the top, to hold the paths to all the sales files that the program finds.
  let results = [];

  // (2) Read the currentFolder with the `readdir` method. 
  const items = await fs.readdir(folderName, { withFileTypes: true });

  // (3) Add a block to loop over each item returned from the `readdir` function using the asynchronous `for...of` loop. 
  for (const item of items) {

    // (4) Add an `if` statement to determine if the item is a file or a directory. 
    if (item.isDirectory()) {

      // (5) If the item is a directory,  recursively call the function `findSalesFiles` again, passing in the path to the item. 
      const resultsReturned = await findSalesFiles(path.join(folderName, item.name));
      results = results.concat(resultsReturned);
    } else {
      // (6) If it's not a directory, add a check to make sure the item name matches *sales.json*.
      if (path.extname(item.name) === ".json")
        results.push(`${folderName}/${item.name}`);
    }
  }


  return results;
}

async function main() {
  const salesDir = path.join(__dirname, "stores");

  // (1) Create a variable called `salesTotalsDir`, which holds the path of the *salesTotals* directory.
  const salesTotalsDir = path.join(__dirname, "salesTotals");

  try {
    // (2) Create the directory if it doesn't already exist.
    await fs.mkdir(salesTotalsDir);
  } catch {
    console.log(`${salesTotalsDir} already exists.`);
  }

  // Calculate sales totals
  const salesFiles = await findSalesFiles(salesDir);

  const salesTotal = await calculateSalesTotal(salesFiles);

  // (3) Write the total to the "totals.txt" file with empty string `String()`
  await fs.writeFile(path.join(salesTotalsDir, "totals.txt"), `${salesTotal}\r\n`, { flag: "a" });
  console.log(`Wrote sales totals to ${salesTotalsDir}`);
}

main();
