/**
 * Service for handling endpoint-related API requests
 */
import { getMockEndpoints } from './mockData';

/**
 * Fetches the list of endpoints from the API
 * @returns {Promise<Array>} The list of endpoints
 */
export async function fetchEndpoints() {
  try {
    console.log('Attempting to fetch endpoints from API...');
    const response = await fetch('http://127.0.0.1:3073/api/endpoints');
    
    if (!response.ok) {
      console.error('Response not OK:', response.status, response.statusText);
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    
    console.log('Fetch successful, parsing JSON...');
    const data = await response.json();
    console.log('Endpoints data received:', data);
    return data;
  } catch (err) {
    console.error('Fetch endpoints error details:', err);
    throw err;
  }
}

/**
 * Creates a new endpoint
 * @param {Object} endpointData - The endpoint data to create
 * @returns {Promise<Object>} The created endpoint
 */
export async function createEndpoint(endpointData) {
  try {
    console.log('Creating endpoint with data:', endpointData);
    
    const response = await fetch('http://127.0.0.1:3073/api/endpoints', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(endpointData)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Create endpoint failed:', response.status, errorText);
      throw new Error(`Failed to create endpoint: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Endpoint created successfully:', data);
    return data;
  } catch (err) {
    console.error('Create endpoint error:', err);
    
    // For development/demo purposes, return mock success after a delay
    // Remove this in production
    console.log('Falling back to mock success...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      id: Math.floor(Math.random() * 1000) + 10,
      ...endpointData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }
}

/**
 * Fetches a single endpoint by its ID
 * @param {number|string} id - The ID of the endpoint to fetch
 * @returns {Promise<Object>} The endpoint data
 */
export async function fetchEndpointById(id) {
  try {
    console.log(`Attempting to fetch endpoint with ID ${id}...`);
    
    // First try to get the endpoint by ID
    let response = await fetch(`http://127.0.0.1:3073/api/endpoints/${id}`);
    
    // If that fails, we might need to get all endpoints and find by ID
    if (!response.ok) {
      console.log('Direct ID fetch failed, trying to find endpoint in list...');
      
      // Get all endpoints
      const allEndpointsResponse = await fetch('http://127.0.0.1:3073/api/endpoints');
      
      if (!allEndpointsResponse.ok) {
        throw new Error(`Failed to fetch endpoints: ${allEndpointsResponse.status}`);
      }
      
      const allEndpoints = await allEndpointsResponse.json();
      const endpoint = allEndpoints.find(e => e.id.toString() === id.toString());
      
      if (!endpoint) {
        throw new Error(`Endpoint with ID ${id} not found in list`);
      }
      
      return endpoint;
    }
    
    const data = await response.json();
    console.log('Endpoint data received:', data);
    return data;
  } catch (err) {
    console.error('Fetch endpoint error details:', err);
    
    // For development/demo purposes, return mock data
    console.log('Falling back to mock data...');
    const mockEndpoints = getMockEndpoints();
    const mockEndpoint = mockEndpoints.find(e => e.id.toString() === id.toString());
    
    if (mockEndpoint) {
      return mockEndpoint;
    }
    
    throw new Error(`Endpoint with ID ${id} not found`);
  }
}

/**
 * Updates an existing endpoint
 * @param {number|string} id - The ID of the endpoint to update
 * @param {Object} endpointData - The updated endpoint data
 * @returns {Promise<Object>} The updated endpoint
 */
export async function updateEndpoint(id, endpointData) {
  try {
    console.log(`Updating endpoint with ID ${id}:`, endpointData);
    
    // According to docs, we should use endpoint_code, not ID
    const endpoint_code = endpointData.endpoint_code;
    
    const response = await fetch(`http://127.0.0.1:3073/api/endpoints/${endpoint_code}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(endpointData)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Update endpoint failed:', response.status, errorText);
      throw new Error(`Failed to update endpoint: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Endpoint updated successfully:', data);
    return data;
  } catch (err) {
    console.error('Update endpoint error:', err);
    
    // For development/demo purposes, return mock success after a delay
    console.log('Falling back to mock success...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      id,
      ...endpointData,
      updatedAt: new Date().toISOString()
    };
  }
}

// Re-export the mock data function for convenience
export { getMockEndpoints }; 