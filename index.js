import { Drug, Pharmacy } from "./pharmacy.js";
import { DRUG_NAMES } from "./constants.js";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const CONFIG = {
  SIMULATION_DAYS: 30,
  OUTPUT_FILE: "output.json",
};



/**
 * Runs the pharmacy simulation for the specified number of days.
 * @param {Pharmacy} pharmacy - The pharmacy instance to simulate
 * @param {number} days - Number of days to simulate
 * @returns {Array<Array<Object>>} Array of drug states for each day
 */
function runSimulation(pharmacy, days) {
  const log = [];

  for (let elapsedDays = 0; elapsedDays < days; elapsedDays++) {
    pharmacy.updateBenefitValue();
    log.push(JSON.parse(JSON.stringify(pharmacy.drugs)));
  }

  return log;
}

/**
 * Initializes the pharmacy with default test drugs.
 * @returns {Pharmacy} Initialized pharmacy instance
 */
function initializePharmacy() {
  const drugs = [
    new Drug("Doliprane", 20, 30),
    new Drug(DRUG_NAMES.HERBAL_TEA, 10, 5),
    new Drug(DRUG_NAMES.FERVEX, 12, 35),
    new Drug(DRUG_NAMES.MAGIC_PILL, 15, 40),
  ];
  return new Pharmacy(drugs);
}

/**
 * Writes simulation results to a JSON file.
 * @param {string} filePath - Path to the output file
 * @param {Array<Array<Object>>} log - Simulation results
 * @returns {Promise<void>}
 */
async function writeOutput(filePath, log) {
  const outputPath = join(__dirname, filePath);
  const content = JSON.stringify({ result: log }, null, 2) + "\n";
  await fs.writeFile(outputPath, content, "utf8");
}

/**
 * Main execution function.
 */
async function main() {
  try {
    const pharmacy = initializePharmacy();
    const log = runSimulation(pharmacy, CONFIG.SIMULATION_DAYS);
    await writeOutput(CONFIG.OUTPUT_FILE, log);
    console.log("✓ Simulation completed successfully");
    console.log(`✓ Results written to ${CONFIG.OUTPUT_FILE}`);
  } catch (error) {
    console.error("✗ Error running simulation:", error.message);
    process.exit(1);
  }
}

// Run the simulation
main();
