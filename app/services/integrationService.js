/**
 * Service for handling integration-related API requests
 */
import { getMockIntegrations } from './mockData';

/**
 * Fetches the list of integrations from the API
 * @returns {Promise<Array>} The list of integrations
 */
export async function fetchIntegrations() {
  try {
    console.log('Attempting to fetch from API...');
    const response = await fetch('http://127.0.0.1:3073/api/integration/list');
    
    if (!response.ok) {
      console.error('Response not OK:', response.status, response.statusText);
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    
    console.log('Fetch successful, parsing JSON...');
    const data = await response.json();
    console.log('Data received:', data);
    return data;
  } catch (err) {
    console.error('Fetch error details:', err);
    throw err;
  }
}

// Re-export the mock data function for convenience
export { getMockIntegrations }; 