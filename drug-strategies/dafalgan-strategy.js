import { DrugStrategy } from "./base-strategy.js";

/**
 * Strategy for Dafalgan.
 * - Degrades in benefit twice as fast as normal drugs
 * - Benefit decreases by 2 per day normally
 * - Benefit decreases by 4 per day after expiration
 * - Benefit never goes below 0
 */
export class DafalganStrategy extends DrugStrategy {
  updateBenefit(drug) {
    // Dafalgan degrades twice as fast as normal drugs (2x normal rate)
    if (drug.benefit > 0) {
      drug.benefit = this.clampBenefit(drug.benefit - 2);
    }
  }

  handleExpired(drug) {
    // After expiration, benefit degrades twice as fast (additional -2)
    if (drug.benefit > 0) {
      drug.benefit = this.clampBenefit(drug.benefit - 2);
    }
  }
}
