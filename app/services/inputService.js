/**
 * Service for handling input schema API requests
 */

const API_BASE_URL = 'http://localhost:3073';

export async function fetchInputs() {
  try {
    const response = await fetch(`http://localhost:3073/api/inputs`);
    
    if (!response.ok) {
      throw new Error(`Error fetching inputs: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch inputs:', error);
    throw error;
  }
}

export async function fetchInputById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/inputs/${id}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching input: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch input with ID ${id}:`, error);
    throw error;
  }
}

export async function fetchInputsByEndpoint(endpointId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/inputs/endpoint/${endpointId}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching inputs for endpoint: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch inputs for endpoint ${endpointId}:`, error);
    throw error;
  }
}

export async function createInput(inputData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/inputs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputData),
    });
    
    if (!response.ok) {
      throw new Error(`Error creating input: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to create input:', error);
    throw error;
  }
}

export async function updateInput(id, inputData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/inputs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputData),
    });
    
    if (!response.ok) {
      throw new Error(`Error updating input: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to update input with ID ${id}:`, error);
    throw error;
  }
}

export async function deleteInput(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/inputs/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Error deleting input: ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error(`Failed to delete input with ID ${id}:`, error);
    throw error;
  }
} 