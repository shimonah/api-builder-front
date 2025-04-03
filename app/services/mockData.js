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

/**
 * Returns mock endpoint data for testing
 * @returns {Array} Mock endpoint data
 */
export function getMockEndpoints() {
  return [
    {
      id: 1,
      endpoint_code: "payment_webhook",
      url_path: "/api/payments/webhook",
      name: "Payment Webhook Endpoint",
      description: "Receives payment notifications from payment providers",
      version: "1.0",
      active: true,
      createdAt: "2025-03-15T10:00:00.000Z",
      updatedAt: "2025-04-01T14:30:00.000Z"
    },
    {
      id: 2,
      endpoint_code: "order_status",
      url_path: "/api/orders/status",
      name: "Order Status Update",
      description: "Receives order status updates from fulfillment systems",
      version: "1.2",
      active: true,
      createdAt: "2025-03-10T09:15:00.000Z",
      updatedAt: "2025-03-28T11:45:00.000Z"
    },
    {
      id: 3,
      endpoint_code: "inventory_sync",
      url_path: "/api/inventory/sync",
      name: "Inventory Synchronization",
      description: "Endpoint for inventory level synchronization",
      version: "2.0",
      active: false,
      createdAt: "2025-02-20T16:30:00.000Z",
      updatedAt: "2025-03-25T13:20:00.000Z"
    }
  ];
}

/**
 * Mock data for endpoint inputs
 * @returns {Array} Mock input data
 */
export function getMockEndpointInputs(endpointId) {
  return [
    { id: 1, name: 'Customer Data', type: 'JSON', fields: 5, endpointId: 1 },
    { id: 2, name: 'Order Information', type: 'Form', fields: 3, endpointId: 1 },
    { id: 3, name: 'Product Details', type: 'XML', fields: 8, endpointId: 2 }
  ].filter(input => !endpointId || input.endpointId === parseInt(endpointId));
}

/**
 * Mock data for endpoint rules
 * @returns {Array} Mock rules data
 */
export function getMockEndpointRules(endpointId) {
  return [
    { id: 1, name: 'Validation Rule', active: true, lastTriggered: '2023-05-15T14:30:00Z', endpointId: 1 },
    { id: 2, name: 'Routing Rule', active: false, lastTriggered: '2023-05-10T09:45:00Z', endpointId: 1 },
    { id: 3, name: 'Authentication Rule', active: true, lastTriggered: '2023-05-12T11:20:00Z', endpointId: 2 }
  ].filter(rule => !endpointId || rule.endpointId === parseInt(endpointId));
}

/**
 * Mock data for endpoint integrations
 * @returns {Array} Mock integrations data
 */
export function getMockEndpointIntegrations(endpointId) {
  return [
    { id: 1, name: 'Payment Gateway', type: 'REST', active: true, endpointId: 1 },
    { id: 2, name: 'Inventory System', type: 'SOAP', active: true, endpointId: 1 },
    { id: 3, name: 'CRM Integration', type: 'GraphQL', active: false, endpointId: 2 }
  ].filter(integration => !endpointId || integration.endpointId === parseInt(endpointId));
}

/**
 * Mock data for endpoint connections
 * @returns {Array} Mock connections data
 */
export function getMockEndpointConnections(endpointId) {
  return [
    { id: 'conn-001', timestamp: '2023-05-15T14:30:00Z', status: 'success', duration: 245, endpointId: 1 },
    { id: 'conn-002', timestamp: '2023-05-15T13:15:00Z', status: 'error', duration: 1245, endpointId: 1 },
    { id: 'conn-003', timestamp: '2023-05-14T10:45:00Z', status: 'success', duration: 189, endpointId: 2 }
  ].filter(connection => !endpointId || connection.endpointId === parseInt(endpointId));
} 