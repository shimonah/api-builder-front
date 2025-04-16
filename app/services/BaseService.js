import config from '../config';

/**
 * Base service class for handling HTTP requests
 * Provides common functionality for all API services
 */
class BaseService {
  constructor(basePath = '') {
    this.baseUrl = config.api.baseUrl;
    this.basePath = basePath;
  }

  /**
   * Get the full URL for an API endpoint
   * @param {string} path - The endpoint path
   * @returns {string} The full URL
   */
  getUrl(path = '') {
    return `${this.baseUrl}${this.basePath}${path}`;
  }

  /**
   * Make a GET request
   * @param {string} path - The endpoint path
   * @param {Object} options - Additional fetch options
   * @returns {Promise<any>} The response data
   */
  async get(path = '', options = {}) {
    return this.request(path, { 
      method: 'GET', 
      ...options 
    });
  }

  /**
   * Make a POST request
   * @param {string} path - The endpoint path
   * @param {Object} data - The request payload
   * @param {Object} options - Additional fetch options
   * @returns {Promise<any>} The response data
   */
  async post(path = '', data = {}, options = {}) {
    return this.request(path, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
  }

  /**
   * Make a PUT request
   * @param {string} path - The endpoint path
   * @param {Object} data - The request payload
   * @param {Object} options - Additional fetch options
   * @returns {Promise<any>} The response data
   */
  async put(path = '', data = {}, options = {}) {
    return this.request(path, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
  }

  /**
   * Make a DELETE request
   * @param {string} path - The endpoint path
   * @param {Object} options - Additional fetch options
   * @returns {Promise<any>} The response data
   */
  async delete(path = '', options = {}) {
    return this.request(path, {
      method: 'DELETE',
      ...options
    });
  }

  /**
   * Make a PATCH request
   * @param {string} path - The endpoint path
   * @param {Object} data - The request payload
   * @param {Object} options - Additional fetch options
   * @returns {Promise<any>} The response data
   */
  async patch(path = '', data = {}, options = {}) {
    return this.request(path, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
  }

  /**
   * Make an HTTP request
   * @param {string} path - The endpoint path
   * @param {Object} options - Fetch options
   * @returns {Promise<any>} The response data
   */
  async request(path, options = {}) {
    const url = this.getUrl(path);
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Accept': 'application/json',
          ...options.headers
        }
      });

      // Handle non-2xx responses
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Request failed with status ${response.status}`);
      }

      // Parse JSON response
      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${url}`, error);
      throw error;
    }
  }
}

export default BaseService; 