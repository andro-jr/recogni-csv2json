const csv = require("csvtojson");
const fs = require("fs");
const path = require("path");

const dmFilePath = path.join(__dirname, "csv/diffusionModel.csv");
const llmCsvPath = path.join(__dirname, "csv/largelanguagemodel.csv");
const prmoptsCsvPath = path.join(__dirname, "csv/prompts.csv");

// Convert DM CSV to JSON
csv()
  .fromFile(dmFilePath)
  .then((jsonObj) => {
    // Defining the JSON structure based on the actual column names CSV file
    const structuredData = jsonObj.slice(1).map((row) => {
      return {
        prompt: Number(Object.values(row)[1]),
        batchSize: Number(Object.values(row)[2]),
        tensorParallelism: Number(Object.values(row)[3]),
        model: Object.values(row)[4],
        recogni: {
          Latency: Number(Object.values(row)[5]),
          "Images/Sec": Number(Object.values(row)[6]),
          "Images/Sec/User": Number(Object.values(row)[7]),
          "Total Power Consumption": Number(Object.values(row)[8]),
          TCO: Number(Object.values(row)[9]),
          Efficiency: Number(Object.values(row)[10]),
        },
        competitor: {
          Latency: Number(Object.values(row)[11]),
          "Images/Sec": Number(Object.values(row)[12]),
          "Images/Sec/User": Number(Object.values(row)[13]),
          "Total Power Consumption": Number(Object.values(row)[14]),
          TCO: Number(Object.values(row)[15]),
          Efficiency: Number(Object.values(row)[16]),
        },
      };
    });

    const wrappedData = {
      diffusionModel: structuredData,
    };

    fs.writeFileSync(
      "json/diffusionModel.json",
      JSON.stringify(wrappedData, null, 2)
    );
    console.log(
      "1) DiffusionModel CSV data has been converted to JSON successfully."
    );
  })
  .catch((error) => {
    console.error("1) Error converting DiffusionModel CSV CSV to JSON:", error);
  });

// Convert LLM CSV to JSON
csv()
  .fromFile(llmCsvPath)
  .then((jsonObj) => {
    // Define the JSON structure based on the actual column names in your CSV file
    const structuredData = jsonObj.slice(1).map((row) => {
      return {
        prompt: Number(Object.values(row)[1]),
        batchSize: Number(Object.values(row)[2]),
        tensorParallelism: Number(Object.values(row)[3]),
        model: Object.values(row)[4],
        recogni: {
          TTFT: Number(Object.values(row)[5]),
          TPOT: Number(Object.values(row)[6]),
          "Tokens/Sec": Number(Object.values(row)[7]),
          "Tokens/Sec/User": Number(Object.values(row)[8]),
          "Total Power Consumption": Number(Object.values(row)[9]),
          TCO: Number(Object.values(row)[10]),
          Efficiency: Number(Object.values(row)[11]),
        },
        competitor: {
          TTFT: Number(Object.values(row)[12]),
          TPOT: Number(Object.values(row)[13]),
          "Tokens/Sec": Number(Object.values(row)[14]),
          "Tokens/Sec/User": Number(Object.values(row)[15]),
          "Total Power Consumption": Number(Object.values(row)[16]),
          TCO: Number(Object.values(row)[17]),
          Efficiency: Number(Object.values(row)[18]),
        },
      };
    });

    const wrappedData = {
      largeLanguageModel: structuredData,
    };

    fs.writeFileSync(
      "json/largeLanguageModel.json",
      JSON.stringify(wrappedData, null, 2)
    );
    console.log(
      "2) LargeLanguageModel CSV data has been converted to JSON successfully."
    );
  })
  .catch((error) => {
    console.error("2) Error converting LargeLanguageModel CSV to JSON:", error);
  });

// Convert Prompts CSV to JSON
csv()
  .fromFile(prmoptsCsvPath)
  .then((jsonObj) => {
    // Define the JSON structure based on the actual column names in your CSV file
    const structuredData = jsonObj
      .filter((row) => Number(Object.values(row)[0]) !== 0)
      .map((row) => {
        return {
          id: Number(Object.values(row)[0]),
          prompt: Object.values(row)[1],
          type: Object.values(row)[2],
          output: Object.values(row)[3],
        };
      });

    const wrappedData = {
      prompts: structuredData,
    };

    fs.writeFileSync("json/prompts.json", JSON.stringify(wrappedData, null, 2));
    console.log("2) Prompts CSV data has been converted to JSON successfully.");
  })
  .catch((error) => {
    console.error("2) Error converting Prompts CSV to JSON:", error);
  });
