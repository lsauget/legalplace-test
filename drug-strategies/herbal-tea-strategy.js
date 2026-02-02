import { DrugStrategy } from "./base-strategy.js";

/**
 * Strategy for Herbal Tea.
 * - Benefit increases by 1 per day
 * - Benefit increases by 2 per day after expiration
 * - Benefit never exceeds 50
 */
export class HerbalTeaStrategy extends DrugStrategy {
  updateBenefit(drug) {
    // Benefit increases by 1 per day (before expiration is decremented)
    if (drug.benefit < 50) {
      drug.benefit = this.clampBenefit(drug.benefit + 1);
    }
  }

  handleExpired(drug) {
    // After expiration, benefit increases twice as fast (additional +1)
    if (drug.benefit < 50) {
      drug.benefit = this.clampBenefit(drug.benefit + 1);
    }
  }
}
