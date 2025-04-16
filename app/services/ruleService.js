import BaseService from './BaseService';

/**
 * Service for handling rule-related API requests
 */
class RuleService extends BaseService {
  constructor() {
    super('/api/rules');
  }

  /**
   * Fetch all rules
   * @returns {Promise<Array>} List of rules
   */
  async fetchRules() {
    return this.get();
  }

  /**
   * Fetch a single rule by ID
   * @param {string} id - Rule ID
   * @returns {Promise<Object>} Rule details
   */
  async fetchRuleById(id) {
    return this.get(`/${id}`);
  }

  /**
   * Create a new rule
   * @param {Object} ruleData - Rule data
   * @returns {Promise<Object>} Created rule
   */
  async createRule(ruleData) {
    return this.post('', ruleData);
  }

  /**
   * Update an existing rule
   * @param {string} id - Rule ID
   * @param {Object} ruleData - Updated rule data
   * @returns {Promise<Object>} Updated rule
   */
  async updateRule(id, ruleData) {
    return this.put(`/${id}`, ruleData);
  }

  /**
   * Delete a rule
   * @param {string} id - Rule ID
   * @returns {Promise<Object>} Deletion result
   */
  async deleteRule(id) {
    return this.delete(`/${id}`);
  }
}

// Create and export a singleton instance
const ruleService = new RuleService();
export default ruleService;

// For backward compatibility with existing code
export const fetchRules = () => ruleService.fetchRules();
export const fetchRuleById = (id) => ruleService.fetchRuleById(id);
export const createRule = (data) => ruleService.createRule(data);
export const updateRule = (id, data) => ruleService.updateRule(id, data);
export const deleteRule = (id) => ruleService.deleteRule(id); 