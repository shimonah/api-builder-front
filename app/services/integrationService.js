/**
 * Service for handling integration-related API requests
 */
import BaseService from './BaseService';
import config from '../config';

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
    try {
      const response = await fetch(`${config.api.baseUrl}/api/integrations/list`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching integrations:', error);
      
      // Return empty array if API fails
      return [];
    }
  }

  /**
   * Fetch a single integration by ID
   * @param {string} id - Integration ID
   * @returns {Promise<Object>} Integration details
   */
  async fetchIntegrationById(id) {
    try {
      const response = await fetch(`${config.api.baseUrl}/api/integrations/${id}`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching integration ${id}:`, error);
      
      // Return empty object if API fails
      return {};
    }
  }

  /**
   * Create a new integration
   * @param {Object} integrationData - Integration data
   * @returns {Promise<Object>} Created integration
   */
  async createIntegration(integrationData) {
    try {
      const response = await fetch(`${config.api.baseUrl}/api/integrations/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(integrationData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating integration:', error);
      throw error;
    }
  }

  /**
   * Update an existing integration
   * @param {string} id - Integration ID
   * @param {Object} integrationData - Updated integration data
   * @returns {Promise<Object>} Updated integration
   */
  async updateIntegration(id, integrationData) {
    try {
      const response = await fetch(`${config.api.baseUrl}/api/integrations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(integrationData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error updating integration ${id}:`, error);
      throw error;
    }
  }

  /**
   * Delete an integration
   * @param {string} id - Integration ID
   * @returns {Promise<Object>} Deletion result
   */
  async deleteIntegration(id) {
    try {
      const response = await fetch(`${config.api.baseUrl}/api/integrations/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API error: ${response.status}`);
      }
      
      return true;
    } catch (error) {
      console.error(`Error deleting integration ${id}:`, error);
      throw error;
    }
  }
}

// Create and export a singleton instance
const integrationService = new IntegrationService();
export default integrationService;

// For backward compatibility with existing code
export const fetchIntegrations = () => integrationService.fetchIntegrations();
export const createIntegration = (data) => integrationService.createIntegration(data);
export const updateIntegration = (id, data) => integrationService.updateIntegration(id, data);
export const deleteIntegration = (id) => integrationService.deleteIntegration(id); 