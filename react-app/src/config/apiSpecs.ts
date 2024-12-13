import { ApiSpec } from '../types/api';

export const apiSpecs: ApiSpec[] = [
  {
    id: 'stripe',
    name: 'Stripe API',
    description: 'Payment processing and financial services API',
    url: 'https://raw.githubusercontent.com/stripe/openapi/master/openapi/spec3.yaml',
    version: '2023-10-16',
    category: 'payment',
    image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&q=80&w=800&h=400'
  },
  {
    id: 'petstore',
    name: 'Swagger Petstore',
    description: 'Sample Petstore API for testing and demonstration',
    url: 'https://petstore3.swagger.io/api/v3/openapi.json',
    version: 'v3',
    category: 'other',
    image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&q=80&w=800&h=400'
  },
  {
    id: 'instagram',
    name: 'Instagram API',
    description: 'Instagram Graph API for social media integration',
    url: 'https://raw.githubusercontent.com/APIs-guru/openapi-directory/main/APIs/instagram.com/1.0.0/openapi.yaml',
    version: 'v1',
    category: 'social',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800&h=400'
  },
  {
    id: 'twilio',
    name: 'Twilio API',
    description: 'Cloud communications platform API',
    url: 'https://raw.githubusercontent.com/twilio/twilio-oai/main/spec/json/twilio_api_v2010.json',
    version: '2010-04-01',
    category: 'cloud',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800&h=400'
  },
  {
    id: 'sendgrid',
    name: 'SendGrid API',
    description: 'Email delivery and management API',
    url: 'https://raw.githubusercontent.com/sendgrid/sendgrid-oai/main/oai_stoplight.json',
    version: 'v3',
    category: 'cloud',
    image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=800&h=400'
  }
];