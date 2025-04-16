import BaseService from './BaseService';

/**
 * Service for handling input-related API requests
 */
class InputService extends BaseService {
  constructor() {
    super('/api/inputs');
  }

  /**
   * Fetch all inputs
   * @returns {Promise<Array>} List of inputs
   */
  async fetchInputs() {
    return this.get();
  }

  /**
   * Fetch a single input by ID
   * @param {string} id - Input ID
   * @returns {Promise<Object>} Input details
   */
  async fetchInputById(id) {
    return this.get(`/${id}`);
  }

  /**
   * Create a new input
   * @param {Object} inputData - Input data
   * @returns {Promise<Object>} Created input
   */
  async createInput(inputData) {
    return this.post('', inputData);
  }

  /**
   * Update an existing input
   * @param {string} id - Input ID
   * @param {Object} inputData - Updated input data
   * @returns {Promise<Object>} Updated input
   */
  async updateInput(id, inputData) {
    return this.put(`/${id}`, inputData);
  }

  /**
   * Delete an input
   * @param {string} id - Input ID
   * @returns {Promise<Object>} Deletion result
   */
  async deleteInput(id) {
    return this.delete(`/${id}`);
  }
}

// Create and export a singleton instance
const inputService = new InputService();
export default inputService;

// For backward compatibility with existing code
export const fetchInputs = () => inputService.fetchInputs();
export const fetchInputById = (id) => inputService.fetchInputById(id);
export const createInput = (data) => inputService.createInput(data);
export const updateInput = (id, data) => inputService.updateInput(id, data);
export const deleteInput = (id) => inputService.deleteInput(id); 