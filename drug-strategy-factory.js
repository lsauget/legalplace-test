import { DRUG_NAMES } from "./constants.js";
import { NormalDrugStrategy } from "./drug-strategies/normal-drug-strategy.js";
import { HerbalTeaStrategy } from "./drug-strategies/herbal-tea-strategy.js";
import { FervexStrategy } from "./drug-strategies/fervex-strategy.js";
import { MagicPillStrategy } from "./drug-strategies/magic-pill-strategy.js";
import { DafalganStrategy } from "./drug-strategies/dafalgan-strategy.js";

/**
 * Factory class for creating drug strategies.
 * Implements the Factory and Registry patterns to map drug names to strategies.
 */
export class DrugStrategyFactory {
  constructor() {
    this.strategies = new Map();
    this.defaultStrategy = new NormalDrugStrategy();
    this._initializeStrategies();
  }

  /**
   * Initialize the strategy registry with known drug types.
   */
  _initializeStrategies() {
    this.strategies.set(DRUG_NAMES.HERBAL_TEA, new HerbalTeaStrategy());
    this.strategies.set(DRUG_NAMES.FERVEX, new FervexStrategy());
    this.strategies.set(DRUG_NAMES.MAGIC_PILL, new MagicPillStrategy());
    this.strategies.set(DRUG_NAMES.DAFALGAN, new DafalganStrategy());
  }

  /**
   * Get the appropriate strategy for a given drug name.
   * @param {string} drugName - The name of the drug
   * @returns {DrugStrategy} The strategy instance for the drug
   */
  getStrategy(drugName) {
    return this.strategies.get(drugName) || this.defaultStrategy;
  }

  /**
   * Register a custom strategy for a drug name.
   * Useful for extending the system with new drug types.
   * @param {string} drugName - The name of the drug
   * @param {DrugStrategy} strategy - The strategy instance
   */
  registerStrategy(drugName, strategy) {
    this.strategies.set(drugName, strategy);
  }
}
