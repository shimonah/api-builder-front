/**
 * Mock data for testing and development
 */

/**
 * Returns mock integration data for testing
 * @returns {Array} Mock integration data
 */
export function getMockIntegrations() {
  return [
    {
      id: 1,
      integrationCode: "mock_payment",
      name: "Payment Transaction Check Test",
      active: true,
      type: "rest",
      updatedAt: "2025-04-01T10:00:00.000Z"
    },
    {
      id: 2,
      integrationCode: "mock_shipping",
      name: "Shipping Integration",
      active: false,
      type: "soap",
      updatedAt: "2025-03-15T08:30:00.000Z"
    },
    {
      id: 3,
      integrationCode: "mock_inventory",
      name: "Inventory Management",
      active: true,
      type: "graphql",
      updatedAt: "2025-03-28T14:45:00.000Z"
    }
  ];
}

export const getMockConnectionHistory = (integrationId) => {
  // You can use the integrationId to return specific history for different integrations
  return [
    { 
      id: 'conn-123', 
      integrationId: integrationId,
      timestamp: '2025-04-02T14:30:00Z', 
      status: 'success', 
      duration: 245,
      statusCode: 200
    },
    { 
      id: 'conn-122', 
      integrationId: integrationId,
      timestamp: '2025-04-02T13:15:00Z', 
      status: 'error', 
      duration: 1245,
      statusCode: 500,
      errorMessage: 'Gateway timeout'
    },
    { 
      id: 'conn-121', 
      integrationId: integrationId,
      timestamp: '2025-04-01T16:45:00Z', 
      status: 'success', 
      duration: 189,
      statusCode: 200
    }
  ];
};

export const getMockTestResult = (integrationId) => {
  // You can customize the test result based on the integration
  return {
    success: true,
    timestamp: new Date().toISOString(),
    requestDuration: 235,
    statusCode: 200,
    responseData: {
      status: "paid",
      amount: 125.50,
      currency: "USD",
      transactionId: "10000002"
    }
  };
}; 