export interface ApiSpec {
  id: string;
  name: string;
  description: string;
  url: string;
  version?: string;
  category: ApiCategory;
  image: string;
}

export type ApiCategory = 'social' | 'ecommerce' | 'payment' | 'cloud' | 'other';