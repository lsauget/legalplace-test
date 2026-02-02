import { MIN_BENEFIT, MAX_BENEFIT } from "../constants.js";

/**
 * Base strategy class for drug benefit and expiration updates.
 * Implements the Template Method pattern to define the update algorithm.
 */
export class DrugStrategy {
  /**
   * Template method - defines the algorithm structure for updating a drug.
   * This ensures consistent update order across all drug types.
   */
  update(drug) {
    this.updateBenefit(drug);
    
    if (this.shouldExpire(drug)) {
      this.updateExpiration(drug);
    }
    
    // Handle post-expiration effects
    if (drug.expiresIn < 0) {
      this.handleExpired(drug);
    }
  }

  /**
   * Updates the drug's benefit value.
   * Must be implemented by subclasses.
   */
  updateBenefit(drug) {
    throw new Error("updateBenefit must be implemented by subclass");
  }

  /**
   * Updates the drug's expiration date.
   * Default behavior: decrement by 1.
   */
  updateExpiration(drug) {
    drug.expiresIn -= 1;
  }

  /**
   * Determines if the drug should expire (decrement expiresIn).
   * Default behavior: true.
   */
  shouldExpire(drug) {
    return true;
  }

  /**
   * Handles special behavior when drug has expired (expiresIn < 0).
   * Default behavior: no special handling.
   */
  handleExpired(drug) {
    // Default: no special handling
  }

  /**
   * Clamps benefit value between MIN_BENEFIT and MAX_BENEFIT.
   */
  clampBenefit(benefit) {
    return Math.max(MIN_BENEFIT, Math.min(MAX_BENEFIT, benefit));
  }
}
