import { useMemo } from 'react';
import { ApiSpec, ApiCategory } from '../types/api';
import { categoryConfig } from '../config/categories';

export function useCategories(specs: ApiSpec[]) {
  return useMemo(() => {
    const categories = new Set(specs.map(spec => spec.category));
    return Array.from(categories).map(category => ({
      ...categoryConfig[category],
      category,
      count: specs.filter(spec => spec.category === category).length
    }));
  }, [specs]);
}