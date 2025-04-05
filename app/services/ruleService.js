// Mock rule service for demonstration purposes

const API_BASE_URL = 'http://localhost:3073';

export const fetchRules = async () => {
  // In a real application, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getMockRules());
    }, 500);
  });
};

export const fetchRuleById = async (id) => {
  // In a real application, this would be an API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const rules = getMockRules();
      const rule = rules.find(r => r.id.toString() === id.toString());
      
      if (rule) {
        resolve(rule);
      } else {
        reject(new Error('Rule not found'));
      }
    }, 500);
  });
};

export const createRule = async (ruleData) => {
  console.log('ruleData', ruleData);
  try {
    const response = await fetch(`${API_BASE_URL}/api/rule`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ruleData),
    });

    if (!response.ok) {
      throw new Error(`Error creating rule: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating rule:', error);
    throw error;
  }
  

  // In a real application, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate creating a rule and returning it with an ID
      const newRule = {
        ...ruleData,
        id: Math.floor(Math.random() * 10000).toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      resolve(newRule);
    }, 1000);
  });
};

export const updateRule = async (id, ruleData) => {
  // In a real application, this would be an API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate updating a rule
      const updatedRule = {
        ...ruleData,
        id,
        updatedAt: new Date().toISOString()
      };
      
      resolve(updatedRule);
    }, 1000);
  });
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