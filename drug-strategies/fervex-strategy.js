import { DrugStrategy } from "./base-strategy.js";
import { FERVEX_THRESHOLD_1, FERVEX_THRESHOLD_2 } from "../constants.js";

/**
 * Strategy for Fervex.
 * - Benefit increases as expiration approaches
 * - +1 benefit normally
 * - +2 benefit when expiresIn < 11 (base +1, then +1 more)
 * - +3 benefit when expiresIn < 6 (base +1, then +1 for < 11, then +1 more for < 6)
 * - Benefit drops to 0 after expiration
 */
export class FervexStrategy extends DrugStrategy {
  updateBenefit(drug) {
    // Base increase: +1
    if (drug.benefit < 50) {
      drug.benefit = this.clampBenefit(drug.benefit + 1);
    }
    
    // Additional +1 when expiresIn < 11
    if (drug.expiresIn < FERVEX_THRESHOLD_1) {
      if (drug.benefit < 50) {
        drug.benefit = this.clampBenefit(drug.benefit + 1);
      }
    }
    
    // Additional +1 when expiresIn < 6 (on top of the +2 from above)
    if (drug.expiresIn < FERVEX_THRESHOLD_2) {
      if (drug.benefit < 50) {
        drug.benefit = this.clampBenefit(drug.benefit + 1);
      }
    }
  }

  handleExpired(drug) {
    // Fervex benefit drops to 0 after expiration
    drug.benefit = 0;
  }
}
