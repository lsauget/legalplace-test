import { DrugStrategyFactory } from "./drug-strategy-factory.js";

export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

export class Pharmacy {
  constructor(drugs = [], strategyFactory = null) {
    this.drugs = drugs;
    this.strategyFactory = strategyFactory || new DrugStrategyFactory();
  }

  /**
   * Updates the benefit value and expiration date for all drugs.
   * Uses the Strategy pattern to delegate drug-specific behavior.
   * @returns {Array<Drug>} The updated drugs array
   */
  updateBenefitValue() {
    for (const drug of this.drugs) {
      const strategy = this.strategyFactory.getStrategy(drug.name);
      strategy.update(drug);
    }

    return this.drugs;
  }
}
