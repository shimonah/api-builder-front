// Mock rule service for demonstration purposes

const API_BASE_URL = 'http://localhost:3073';

export const fetchRules = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/rules`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch rules:', error);
    // Return an empty array as fallback
    return [];
  }
};

export const fetchRuleById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/rules/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch rule with ID ${id}:`, error);
    throw error;
  }
};

export async function createRule(ruleData) {
  try {

    const response = await fetch(`${API_BASE_URL}/api/rules`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ruleData),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to create rule:', error);
    throw error;
  }
}

export const updateRule = async (id, ruleData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/rules/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ruleData),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to update rule with ID ${id}:`, error);
    throw error;
  }
};

export const deleteRule = async (id) => {
  // In a real application, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate deleting a rule
      resolve({ success: true });
    }, 1000);
  });
};

export const getMockRules = () => {
  return [];
  return [
    {
      id: '1',
      name: 'PayPal Standard Processing',
      description: 'Route PayPal payments to standard verification endpoint',
      logical_operator: 'AND',
      conditions: [
        {
          property_path: 'order.payment.method',
          property_type: 'body_json',
          operator: 'equals',
          value: 'paypal',
          transform: 'lowercase'
        }
      ],
      integration_code: 'paypal_transaction_verify',
      priority: 100,
      active: true,
      createdAt: '2023-01-15T10:30:00Z',
      updatedAt: '2023-01-15T10:30:00Z'
    },
    {
      id: '2',
      name: 'PayPal High-Value Transaction',
      description: 'Route high-value PayPal payments to enhanced verification',
      logical_operator: 'AND',
      conditions: [
        {
          property_path: 'order.payment.method',
          property_type: 'body_json',
          operator: 'equals',
          value: 'paypal',
          transform: 'lowercase'
        },
        {
          property_path: 'order.total',
          property_type: 'body_json',
          operator: 'greater_than',
          value: 1000
        }
      ],
      integration_code: 'paypal_enhanced_verify',
      priority: 200,
      active: true,
      createdAt: '2023-01-16T14:20:00Z',
      updatedAt: '2023-01-16T14:20:00Z'
    },
    {
      id: '3',
      name: 'Stripe Processing',
      description: 'Route Stripe payments to Stripe verification endpoint',
      logical_operator: 'AND',
      conditions: [
        {
          property_path: 'order.payment.method',
          property_type: 'body_json',
          operator: 'equals',
          value: 'stripe'
        }
      ],
      integration_code: 'stripe_payment_check',
      priority: 100,
      active: true,
      createdAt: '2023-01-17T09:15:00Z',
      updatedAt: '2023-01-17T09:15:00Z'
    },
    {
      id: '4',
      name: 'European Payment Processing',
      description: 'Route European region payments to regional processor',
      logical_operator: 'AND',
      conditions: [
        {
          property_path: 'customer.region',
          property_type: 'body_json',
          operator: 'in',
          value: ['EU', 'UK', 'EFTA']
        },
        {
          property_path: 'order.currency',
          property_type: 'body_json',
          operator: 'in',
          value: ['EUR', 'GBP', 'CHF']
        }
      ],
      integration_code: 'european_payment_processor',
      priority: 120,
      active: false,
      createdAt: '2023-01-18T11:45:00Z',
      updatedAt: '2023-01-18T11:45:00Z'
    }
  ];
}; 