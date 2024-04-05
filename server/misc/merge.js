const fs = require('fs');

// Function to read JSON file and parse its content
function readJSONFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(content);
}

// Function to merge arrays of JSON objects
function mergeJSONArrays(filePaths) {
  let mergedArray = [];
  for (const filePath of filePaths) {
    const jsonArray = readJSONFile(filePath);
    mergedArray = mergedArray.concat(jsonArray);
  }
  return mergedArray;
}

// Array of file paths to be merged
const jsonFiles = ['food.json', 'new launches.json', 'PIZZA MANIA.json','ragipixxa.json','veg pixxa.json']; // Add more file paths as needed

// Merge JSON arrays from files
const mergedJSON = mergeJSONArrays(jsonFiles);

// Write merged JSON array into a new JSON file
const outputFilePath = 'merged.json';
fs.writeFileSync(outputFilePath, JSON.stringify(mergedJSON, null, 2));
console.log(`Merged JSON array has been written to ${outputFilePath}`);
