const csv = require("csvtojson");
const fs = require("fs");

// Path to the CSV file

const path = require("path");

// Path to your Excel file
const csvFilePath = path.join(__dirname, "diffusionModel");
console.log("csvFilePath :", csvFilePath);

// Convert CSV to JSON
csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    // Define the JSON structure based on the actual column names in your CSV file
    const structuredData = jsonObj.slice(1).map((row) => {
      return {
        prompt: Number(Object.values(row)[1]),
        batchSize: Number(Object.values(row)[2]),
        tensorParallelism: Number(Object.values(row)[3]),
        model: Object.values(row)[4],
        recogni: {
          "Latency [ms]": Number(Object.values(row)[5]),
          "Images/Sec": Number(Object.values(row)[6]),
          "Images/Sec/User": Number(Object.values(row)[7]),
          "Total Power Consumption [W]": Number(Object.values(row)[8]),
          "TCO [$/Image]": Number(Object.values(row)[9]),
          "Efficiency [TFLOPS/W]": Number(Object.values(row)[10]),
        },
        competitor: {
          "Latency [ms]": Number(Object.values(row)[11]),
          "Images/Sec": Number(Object.values(row)[12]),
          "Images/Sec/User": Number(Object.values(row)[13]),
          "Total Power Consumption [W]": Number(Object.values(row)[14]),
          "TCO [$/Image]": Number(Object.values(row)[15]),
          "Efficiency [TFLOPS/W]": Number(Object.values(row)[16]),
        },
      };
    });

    const wrappedData = {
      diffusionModel: structuredData,
    };

    // Write the structured data to a JSON file
    fs.writeFileSync("output.json", JSON.stringify(wrappedData, null, 2));
    console.log("CSV data has been converted to JSON successfully.");
  })
  .catch((error) => {
    console.error("Error converting CSV to JSON:", error);
  });
