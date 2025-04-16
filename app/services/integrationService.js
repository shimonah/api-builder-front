/**
 * Service for handling integration-related API requests
 */
import BaseService from './BaseService';

/**
 * Service for handling integration-related API requests
 */
class IntegrationService extends BaseService {
  constructor() {
    super('/api/integrations');
  }

  /**
   * Fetch all integrations
   * @returns {Promise<Array>} List of integrations
   */
  async fetchIntegrations() {
    return this.get();
  }

  /**
   * Fetch a single integration by ID
   * @param {string} id - Integration ID
   * @returns {Promise<Object>} Integration details
   */
  async fetchIntegrationById(id) {
    return this.get(`/${id}`);
  }

  /**
   * Create a new integration
   * @param {Object} integrationData - Integration data
   * @returns {Promise<Object>} Created integration
   */
  async createIntegration(integrationData) {
    return this.post('', integrationData);
  }

  /**
   * Update an existing integration
   * @param {string} id - Integration ID
   * @param {Object} integrationData - Updated integration data
   * @returns {Promise<Object>} Updated integration
   */
  async updateIntegration(id, integrationData) {
    return this.put(`/${id}`, integrationData);
  }

  /**
   * Delete an integration
   * @param {string} id - Integration ID
   * @returns {Promise<Object>} Deletion result
   */
  async deleteIntegration(id) {
    return this.delete(`/${id}`);
  }
}

// Create and export a singleton instance
const integrationService = new IntegrationService();
export default integrationService;

// For backward compatibility with existing code
export const fetchIntegrations = () => integrationService.fetchIntegrations(); 