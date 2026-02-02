import { DrugStrategy } from "./base-strategy.js";

/**
 * Strategy for Magic Pill.
 * - Never expires
 * - Never decreases in benefit
 */
export class MagicPillStrategy extends DrugStrategy {
  updateBenefit(drug) {
    // Magic Pill never changes
  }

  updateExpiration(drug) {
    // Magic Pill never expires
  }

  shouldExpire(drug) {
    return false;
  }

  handleExpired(drug) {
    // Magic Pill never expires, so this should never be called
  }
}
