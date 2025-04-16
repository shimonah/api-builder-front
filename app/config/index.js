/**
 * Application configuration
 * Centralizes access to environment variables and other configuration
 */

// Default to localhost:3073 if API_BASE_URL is not defined in environment
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3073';

// Export configuration as a single object
const config = {
  api: {
    baseUrl: API_BASE_URL,
    timeout: 10000, // 10 seconds timeout for API requests
    retryAttempts: 1, // Number of retry attempts for failed requests
  },
  // Add other configuration sections as needed
};

export default config; 