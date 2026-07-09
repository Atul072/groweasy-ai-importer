const Papa = require("papaparse");
const Lead = require("../models/Lead");
const cleanCSV = require("../utils/cleanCSV");
const createBatches = require("../utils/createBatches");

const importCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No CSV uploaded",
      });
    }

    // CSV Parse
    const csvString = req.file.buffer.toString("utf8");

    const parsed = Papa.parse(csvString, {
      header: true,
      skipEmptyLines: true,
    });

    const cleanedRows = cleanCSV(parsed.data);

    console.log("\n========== FIRST ROW ==========");
    console.log(cleanedRows[0]);

    const batches = createBatches(cleanedRows, 100);

    let mappedData = [];
    let skippedRecords = 0;

    for (const batch of batches) {
      batch.forEach((row) => {
        // Detect headers automatically
        const emailKey = Object.keys(row).find((k) =>
          k.toLowerCase().includes("email")
        );

        const mobileKey = Object.keys(row).find((k) => {
          const key = k.toLowerCase();
          return (
            key.includes("mobile") ||
            key.includes("phone") ||
            key.includes("contact")
          );
        });

        const nameKey = Object.keys(row).find((k) => {
          const key = k.toLowerCase();
          return key.includes("name");
        });

        const companyKey = Object.keys(row).find((k) =>
          k.toLowerCase().includes("company")
        );

        const cityKey = Object.keys(row).find((k) =>
          k.toLowerCase().includes("city")
        );

        const stateKey = Object.keys(row).find((k) =>
          k.toLowerCase().includes("state")
        );

        const countryKey = Object.keys(row).find((k) =>
          k.toLowerCase().includes("country")
        );

        const email = emailKey ? String(row[emailKey]).trim() : "";
        const mobile = mobileKey ? String(row[mobileKey]).trim() : "";

        // Skip if both missing
        if (!email && !mobile) {
          skippedRecords++;
          return;
        }

       mappedData.push({
  created_at: row["created at"] || "",

  name: row["name"] || "",

  email: row["email"] || "",

  country_code: row["country code"] || "",

  mobile_without_country_code:
    row["mobile without country code"] || "",

  company: row["company"] || "",

  city: row["city"] || "",

  state: row["state"] || "",

  country: row["country"] || "",

  lead_owner: row["lead owner"] || "",

  crm_status: row["crm status"] || "",

  crm_note: row["crm note"] || "",

  data_source: row["data source"] || "",

  possession_time: row["possession time"] || "",

  description: row["description"] || "",
});
      });
    }

    console.log("\n========== FINAL MAPPED DATA ==========");
    console.log(mappedData);
    // Save to MongoDB
await Lead.insertMany(mappedData);

console.log("✅ Data Saved Successfully");

    return res.status(200).json({
      success: true,
      message: "Import Completed Successfully 🚀",
      totalRecords: cleanedRows.length,
      importedRecords: mappedData.length,
      skippedRecords,
      mappedData,
    });
  } catch (error) {
    console.error("\n========== IMPORT ERROR ==========");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  importCSV,
};