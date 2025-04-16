/**
 * Service for handling endpoint-related API requests
 */
import BaseService from './BaseService';

/**
 * Service for handling endpoint-related API requests
 */
class EndpointService extends BaseService {
  constructor() {
    super('/api/endpoints');
  }

  /**
   * Fetch all endpoints
   * @returns {Promise<Array>} List of endpoints
   */
  async fetchEndpoints() {
    return this.get();
  }

  /**
   * Fetch a single endpoint by ID
   * @param {string} id - Endpoint ID
   * @returns {Promise<Object>} Endpoint details
   */
  async fetchEndpointById(id) {
    return this.get(`/${id}`);
  }

  /**
   * Create a new endpoint
   * @param {Object} endpointData - Endpoint data
   * @returns {Promise<Object>} Created endpoint
   */
  async createEndpoint(endpointData) {
    return this.post('', endpointData);
  }

  /**
   * Update an existing endpoint
   * @param {string} id - Endpoint ID
   * @param {Object} endpointData - Updated endpoint data
   * @returns {Promise<Object>} Updated endpoint
   */
  async updateEndpoint(id, endpointData) {
    return this.put(`/${id}`, endpointData);
  }

  /**
   * Delete an endpoint
   * @param {string} id - Endpoint ID
   * @returns {Promise<Object>} Deletion result
   */
  async deleteEndpoint(id) {
    return this.delete(`/${id}`);
  }
}

// Create and export a singleton instance
const endpointService = new EndpointService();
export default endpointService;

// For backward compatibility with existing code
export const fetchEndpoints = () => endpointService.fetchEndpoints();
export const fetchEndpointById = (id) => endpointService.fetchEndpointById(id);
export const createEndpoint = (data) => endpointService.createEndpoint(data);
export const updateEndpoint = (id, data) => endpointService.updateEndpoint(id, data);
export const deleteEndpoint = (id) => endpointService.deleteEndpoint(id); 