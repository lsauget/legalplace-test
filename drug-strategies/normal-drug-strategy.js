import { DrugStrategy } from "./base-strategy.js";

/**
 * Strategy for normal drugs (default behavior).
 * - Benefit decreases by 1 per day
 * - Benefit decreases by 2 per day after expiration
 * - Benefit never goes below 0
 */
export class NormalDrugStrategy extends DrugStrategy {
  updateBenefit(drug) {
    // Benefit decreases by 1 per day (before expiration is decremented)
    if (drug.benefit > 0) {
      drug.benefit = this.clampBenefit(drug.benefit - 1);
    }
  }

  handleExpired(drug) {
    // After expiration, benefit degrades twice as fast (additional -1)
    if (drug.benefit > 0) {
      drug.benefit = this.clampBenefit(drug.benefit - 1);
    }
  }
}
