import { fetchIntegrations, getMockIntegrations } from '../../services/integrationService';

export async function GET() {
  try {
    const data = await fetchIntegrations();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('API route error:', error);
    // Return mock data as fallback
    return new Response(JSON.stringify(getMockIntegrations()), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 