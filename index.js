const csv = require("csvtojson");
const fs = require("fs");
const path = require("path");

const INPUT_ROOT_DIR = "csv";
const OUTPUT_ROOT_DIR = "json";

const dmFilePath = path.join(__dirname, `${INPUT_ROOT_DIR}/diffusionModel.csv`);
const llmCsvPath = path.join(
  __dirname,
  `${INPUT_ROOT_DIR}/largelanguagemodel.csv`
);
const prmoptsCsvPath = path.join(__dirname, `${INPUT_ROOT_DIR}/prompts.csv`);
const modelsCsvPath = path.join(__dirname, `${INPUT_ROOT_DIR}/models.csv`);
const paramsCsvPath = path.join(__dirname, `${INPUT_ROOT_DIR}/parameters.csv`);
const sliderCsv = path.join(__dirname, `${INPUT_ROOT_DIR}/slider.csv`);

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
      `${OUTPUT_ROOT_DIR}/diffusionModel.json`,
      JSON.stringify(wrappedData, null, 2)
    );
    console.log(
      "** DiffusionModel CSV data has been converted to JSON successfully."
    );
  })
  .catch((error) => {
    console.error("** Error converting DiffusionModel CSV CSV to JSON:", error);
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
      `${OUTPUT_ROOT_DIR}/largeLanguageModel.json`,
      JSON.stringify(wrappedData, null, 2)
    );
    console.log(
      "** LargeLanguageModel CSV data has been converted to JSON successfully."
    );
  })
  .catch((error) => {
    console.error("** Error converting LargeLanguageModel CSV to JSON:", error);
  });

// Convert Models CSV to JSON
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

    fs.writeFileSync(
      `${OUTPUT_ROOT_DIR}/prompts.json`,
      JSON.stringify(wrappedData, null, 2)
    );
    console.log("** Prompts CSV data has been converted to JSON successfully.");
  })
  .catch((error) => {
    console.error("** Error converting Prompts CSV to JSON:", error);
  });

// Convert Parameters CSV to JSON
csv()
  .fromFile(modelsCsvPath)
  .then((jsonObj) => {
    // Define the JSON structure based on the actual column names in your CSV file
    const structuredData = jsonObj
      .filter((row) => Number(Object.values(row)[0]) !== 0)
      .map((row) => {
        return {
          name: Object.values(row)[0],
          type: Object.values(row)[1],
        };
      });

    const wrappedData = {
      models: structuredData,
    };

    fs.writeFileSync(
      `${OUTPUT_ROOT_DIR}/models.json`,
      JSON.stringify(wrappedData, null, 2)
    );
    console.log("** Models CSV data has been converted to JSON successfully.");
  })
  .catch((error) => {
    console.error("** Error converting Models CSV to JSON:", error);
  });

// Convert Prompts CSV to JSON
csv()
  .fromFile(paramsCsvPath)
  .then((jsonObj) => {
    let batchArray = [];
    let tensorArray = [];
    // Define the JSON structure based on the actual column names in your CSV file
    jsonObj
      .filter(
        (row) =>
          Number(Object.values(row)[0]) !== 0 ||
          Number(Object.values(row)[1]) !== 0
      )
      .forEach((row) => {
        if (Number(Object.values(row)[0]) !== 0)
          batchArray.push(Number(Object.values(row)[0]));
        if (Number(Object.values(row)[1]) !== 0)
          tensorArray.push(Number(Object.values(row)[1]));
      });

    const structuredData = {
      batchSize: batchArray,
      tensorParallelism: tensorArray,
    };

    const wrappedData = {
      parameters: structuredData,
    };

    fs.writeFileSync(
      `${OUTPUT_ROOT_DIR}/parameters.json`,
      JSON.stringify(wrappedData, null, 2)
    );
    console.log(
      "** Parameters CSV data has been converted to JSON successfully."
    );
  })
  .catch((error) => {
    console.error("** Error converting Parameters CSV to JSON:", error);
  });

csv()
  .fromFile(sliderCsv)
  .then((jsonObj) => {
    // Defining the JSON structure based on the actual column names CSV file
    const structuredData = jsonObj.slice(1).map((row) => {
      return {
        inputToken: Number(Object.values(row)[0]),
        outputToken: Number(Object.values(row)[1]),
        batchSize: Number(Object.values(row)[2]),
        tensorParallelism: Number(Object.values(row)[3]),
        model: Object.values(row)[4],
        TTFT: Number(Object.values(row)[5]),
        TPOT: Number(Object.values(row)[6]),
        "Tokens/Sec": Number(Object.values(row)[7]),
        "Tokens/Sec/User": Number(Object.values(row)[8]),
        "Total Power Consumption": Number(Object.values(row)[9]),
        TCO: Number(Object.values(row)[10]),
        Efficiency: Number(Object.values(row)[11]),
      };
    });

    fs.writeFileSync(
      `${OUTPUT_ROOT_DIR}/slider.json`,
      JSON.stringify(structuredData)
    );
    console.log("** Slider CSV data has been converted to JSON successfully.");
  })
  .catch((error) => {
    console.error("** Error converting Slider CSV to JSON:", error);
  });
